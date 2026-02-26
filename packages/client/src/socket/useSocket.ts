import { useEffect, useCallback } from 'react';
import { getSocket, connectSocket, disconnectSocket } from './client';
import { useRoomStore } from '../store/useRoomStore';
import { useGameStore } from '../store/useGameStore';
import type { Room, Player, RoundResult } from '@baucua/shared';

export function useSocket() {
  const socket = getSocket();

  // Room store actions
  const setRoom = useRoomStore((s) => s.setRoom);
  const updateRoom = useRoomStore((s) => s.updateRoom);
  const addPlayer = useRoomStore((s) => s.addPlayer);
  const removePlayer = useRoomStore((s) => s.removePlayer);
  const setError = useRoomStore((s) => s.setError);
  const clearRoom = useRoomStore((s) => s.clearRoom);

  // Game store actions
  const setCountdown = useGameStore((s) => s.setCountdown);
  const setRoundNumber = useGameStore((s) => s.setRoundNumber);
  const setGameState = useGameStore((s) => s.setGameState);
  const addBettedPlayer = useGameStore((s) => s.addBettedPlayer);
  const setRoundResult = useGameStore((s) => s.setRoundResult);
  const resetGameState = useGameStore((s) => s.resetGameState);

  useEffect(() => {
    connectSocket();

    // Room events
    socket.on('room:created', ({ room }) => {
      setRoom(room);
    });

    socket.on('room:joined', ({ room }) => {
      setRoom(room);
    });

    socket.on('room:updated', ({ room }) => {
      updateRoom(room);
      // Keep game state - don't reset between rounds
    });

    socket.on('room:player-joined', ({ player }) => {
      addPlayer(player);
    });

    socket.on('room:player-left', ({ playerId, newHostId }) => {
      removePlayer(playerId, newHostId);
    });

    socket.on('room:closed', ({ reason }) => {
      setError(reason);
      clearRoom();
    });

    // Game events
    socket.on('game:round-started', ({ countdown, roundNumber }) => {
      setCountdown(countdown);
      setRoundNumber(roundNumber);
      setGameState('betting');
    });

    socket.on('game:countdown', ({ countdown }) => {
      setCountdown(countdown);
    });

    socket.on('game:bet-placed', ({ playerId, playerName, bets, totalBet }) => {
      addBettedPlayer(playerId, playerName, bets, totalBet);
    });

    socket.on('game:shaking', () => {
      setGameState('shaking');
    });

    socket.on('game:result', ({ result, room }) => {
      setRoundResult(result);
      setGameState('result');
      updateRoom(room);
    });

    // Error
    socket.on('error', ({ message }) => {
      setError(message);
    });

    return () => {
      socket.off('room:created');
      socket.off('room:joined');
      socket.off('room:updated');
      socket.off('room:player-joined');
      socket.off('room:player-left');
      socket.off('room:closed');
      socket.off('game:round-started');
      socket.off('game:countdown');
      socket.off('game:bet-placed');
      socket.off('game:shaking');
      socket.off('game:result');
      socket.off('error');
    };
  }, []);

  // Actions
  const createRoom = useCallback((playerName: string) => {
    socket.emit('room:create', { playerName });
  }, []);

  const joinRoom = useCallback((code: string, playerName: string) => {
    socket.emit('room:join', { code, playerName });
  }, []);

  const leaveRoom = useCallback(() => {
    socket.emit('room:leave');
    clearRoom();
    resetGameState();
  }, []);

  const startRound = useCallback(() => {
    socket.emit('game:start-round');
  }, []);

  const placeBet = useCallback((bets: { face: string; amount: number }[]) => {
    socket.emit('game:bet', { bets: bets as any });
  }, []);

  const rebuy = useCallback(() => {
    socket.emit('game:rebuy');
  }, []);

  return {
    socket,
    isConnected: socket.connected,
    createRoom,
    joinRoom,
    leaveRoom,
    startRound,
    placeBet,
    rebuy,
  };
}
