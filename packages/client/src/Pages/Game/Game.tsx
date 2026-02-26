import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSocket } from '../../socket/useSocket';
import { useRoomStore } from '../../store/useRoomStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useGameStore } from '../../store/useGameStore';
import { getSocket } from '../../socket/client';
import GameBoard from '../../components/GameBoard';
import HostGameBoard from '../../components/HostGameBoard';
import PlayerList from '../../components/PlayerList';
import CountdownTimer from '../../components/CountdownTimer';
import DiceResult from '../../components/DiceResult';
import DiceShaker from '../../components/DiceShaker';
import Toast from '../../components/Toast';
import '../../assets/CSS/ExGame.css';

export default function Game() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [betSubmitted, setBetSubmitted] = useState(false);

  const room = useRoomStore((s) => s.room);
  const error = useRoomStore((s) => s.error);
  const clearError = useRoomStore((s) => s.clearError);
  const gameState = useGameStore((s) => s.gameState);
  const countdown = useGameStore((s) => s.countdown);
  const roundNumber = useGameStore((s) => s.roundNumber);
  const roundResult = useGameStore((s) => s.roundResult);
  const bettedPlayers = useGameStore((s) => s.bettedPlayers);
  const localBets = useGameStore((s) => s.localBets);
  const increaseBet = useGameStore((s) => s.increaseBet);
  const decreaseBet = useGameStore((s) => s.decreaseBet);
  const getBetsForSubmit = useGameStore((s) => s.getBetsForSubmit);
  const getTotalBet = useGameStore((s) => s.getTotalBet);
  const initLocalScore = useGameStore((s) => s.initLocalScore);
  const resetLocalBets = useGameStore((s) => s.resetLocalBets);

  const { placeBet, leaveRoom, startRound, rebuy } = useSocket();
  const socket = getSocket();

  const isHost = room?.hostId === socket.id;
  const myPlayer = room?.players.find((p) => p.id === socket.id);

  // Check if we're between rounds (waiting for next round)
  const isWaitingForNextRound = room?.state === 'waiting' && roundNumber > 0;

  // Check if player is bankrupt (no money to bet)
  const isBankrupt = myPlayer && !isHost && myPlayer.score <= 0;

  // Check if host is low on funds
  const isHostLowFunds = myPlayer && isHost && myPlayer.score <= 0;

  // Init local score from player
  useEffect(() => {
    if (myPlayer) {
      initLocalScore(myPlayer.score);
    }
  }, [myPlayer?.score, initLocalScore]);

  // Reset local bets and bet submitted state when new round starts
  useEffect(() => {
    if (gameState === 'betting') {
      resetLocalBets();
      setBetSubmitted(false);
    }
  }, [gameState, resetLocalBets]);

  // Clear error after a few seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // If no room, redirect to lobby
  useEffect(() => {
    if (!room) {
      navigate('/lobby');
    }
  }, [room, navigate]);

  const handlePlaceBet = useCallback(() => {
    const bets = getBetsForSubmit();
    const totalBet = getTotalBet();

    if (totalBet <= 0) {
      return; // No bet to submit
    }

    if (myPlayer && totalBet > myPlayer.score) {
      return; // Not enough score - should be prevented by UI
    }

    if (bets.length > 0) {
      placeBet(bets);
      setBetSubmitted(true);
    }
  }, [getBetsForSubmit, getTotalBet, placeBet, myPlayer]);

  const handleLeave = () => {
    leaveRoom();
    navigate('/lobby');
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center" id="exGame">
        <p className="text-white">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 sm:p-6" id="exGame">
      <Toast />

      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-[toast-in_0.4s_ease-out]">
          <div className="bg-red-500 border-red-300 border-2 rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="text-white font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl text-amber-400 font-bold drop-shadow-lg">
              Round #{roundNumber || 1}
            </h1>
            <p className="text-white/70 text-sm drop-shadow-lg">Phòng: {room.code}</p>
          </div>

          <div className="flex items-center gap-3">
            {myPlayer && (
              <span className="px-4 py-2 bg-black/70 rounded-full text-white border border-white/20">
                {myPlayer.name}:{' '}
                <span className="text-yellow-300 font-bold">
                  {myPlayer.score.toLocaleString()}$
                </span>
              </span>
            )}
            <button
              onClick={handleLeave}
              className="px-4 py-2 bg-black/50 hover:bg-black/70 rounded-full text-white/70 hover:text-white transition-colors border border-white/20"
            >
              Rời
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4">
        {/* Main game area */}
        <div className="flex-1">
          {/* Countdown or Status */}
          <div className="mb-4">
            {gameState === 'betting' && (
              <CountdownTimer seconds={countdown} />
            )}
            {gameState === 'shaking' && (
              <div className="flex justify-center py-4">
                <DiceShaker
                  results={roundResult?.diceResults}
                  isShaking={true}
                />
              </div>
            )}
            {(gameState === 'result' || isWaitingForNextRound) && roundResult && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <DiceShaker
                    results={roundResult.diceResults}
                    isShaking={false}
                  />
                </div>
                <DiceResult result={roundResult} myPlayerId={socket.id} />
              </div>
            )}
          </div>

          {/* Bankrupt message */}
          {isBankrupt && gameState === 'betting' && (
            <div className="text-center py-8 bg-black/80 rounded-2xl border border-red-500/50">
              <span className="text-5xl mb-4 block">💸</span>
              <h3 className="text-red-400 text-xl font-bold mb-2">Hết tiền rồi!</h3>
              <p className="text-white/70 mb-4">Bạn không còn tiền để đặt cược</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => rebuy()}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all active:scale-95"
                >
                  💰 Vay thêm 1000$
                </button>
                <button
                  onClick={handleLeave}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-xl transition-all active:scale-95"
                >
                  Rời phòng
                </button>
              </div>
            </div>
          )}

          {/* Game Board - only show for non-host during betting (and not bankrupt) */}
          {!isHost && !isBankrupt && gameState === 'betting' && (
            <>
              <GameBoard
                bets={localBets}
                onIncrease={increaseBet}
                onDecrease={decreaseBet}
                disabled={betSubmitted}
              />
              <div className="mt-4 text-center space-y-2">
                {/* Show total bet */}
                {getTotalBet() > 0 && (
                  <p className="text-white/80 text-sm">
                    Tổng cược: <span className="text-yellow-300 font-bold">{getTotalBet().toLocaleString()}$</span>
                  </p>
                )}

                {betSubmitted ? (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-xl text-white font-bold">
                    <span>✓</span>
                    Đã đặt cược - Đang chờ kết quả...
                  </div>
                ) : (
                  <button
                    onClick={handlePlaceBet}
                    disabled={getTotalBet() <= 0}
                    className={`px-8 py-3 font-bold rounded-xl transition-all active:scale-95 shadow-lg ${
                      getTotalBet() > 0
                        ? 'bg-amber-500 hover:bg-amber-400 text-white cursor-pointer'
                        : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {getTotalBet() > 0 ? 'Xác nhận đặt cược' : 'Chọn ô để đặt cược'}
                  </button>
                )}
              </div>
            </>
          )}

          {/* Host view during betting - same board layout as players */}
          {isHost && gameState === 'betting' && (
            <>
              {/* Host game board showing who bet on what */}
              <HostGameBoard bettedPlayers={bettedPlayers} />

              {/* Summary */}
              <div className="mt-4 text-center">
                <div className="inline-block bg-black/60 rounded-xl px-6 py-3 border border-white/20">
                  <p className="text-white/70 text-sm">
                    Đang chờ người chơi đặt cược...
                  </p>
                  <p className="text-amber-400 text-3xl font-bold mt-1">
                    {countdown}s
                  </p>
                  {bettedPlayers.length > 0 && (
                    <p className="text-white/60 text-sm mt-2">
                      {bettedPlayers.length} người đã đặt |{' '}
                      <span className="text-yellow-300 font-bold">
                        {bettedPlayers.reduce((sum, p) => sum + p.totalBet, 0).toLocaleString()}$
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Host low funds warning */}
          {isHostLowFunds && (gameState === 'result' || isWaitingForNextRound) && (
            <div className="text-center py-6 mt-4 bg-red-900/50 rounded-2xl border border-red-500/50">
              <span className="text-4xl mb-2 block">⚠️</span>
              <h3 className="text-red-300 text-lg font-bold mb-2">Hết vốn rồi!</h3>
              <p className="text-white/70 text-sm mb-3">Nhà cái cần thêm tiền để tiếp tục</p>
              <button
                onClick={() => rebuy()}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all active:scale-95"
              >
                💰 Vay thêm 10,000$
              </button>
            </div>
          )}

          {/* Waiting for next round - show for host */}
          {isHost && (gameState === 'result' || isWaitingForNextRound) && (
            <div className="text-center mt-6">
              <button
                onClick={startRound}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg border-2 border-amber-300"
              >
                🎲 Chơi tiếp
              </button>
            </div>
          )}

          {/* Waiting message for non-host after result */}
          {!isHost && (gameState === 'result' || isWaitingForNextRound) && (
            <div className="text-center py-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/70 rounded-full border border-white/20">
                <span className="animate-pulse">⏳</span>
                <span className="text-white font-medium">
                  Đang chờ nhà cái bắt đầu round mới...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Player list */}
        <div className="w-full lg:w-72">
          <PlayerList
            players={room.players}
            myId={socket.id}
            roundResult={roundResult}
          />
        </div>
      </div>
    </div>
  );
}
