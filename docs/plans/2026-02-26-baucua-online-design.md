# Bau Cua Online - Game Design Document

## Overview

Chuyển đổi game Bầu Cua single-player thành multiplayer realtime với kiến trúc monorepo.

## Decisions

| Quyết định | Chọn |
|---|---|
| Kiểu game | Multiplayer realtime, nhà cái cố định |
| Monorepo tooling | Nx + pnpm workspaces |
| Backend | Express + Socket.IO |
| Language | TypeScript toàn bộ |
| Database | Không — in-memory |
| Player limit | Không giới hạn |
| Betting timer | 15 giây, server tự động xúc khi hết giờ |

## Architecture

```
baucua-online/
├── packages/
│   ├── shared/           # Types + game logic dùng chung
│   │   ├── types/        # Room, Player, BetItem, Socket events
│   │   ├── constants/    # DICE_FACES, BETTING_TIME, etc.
│   │   └── logic/        # calculateScore(), rollDice(), validateBets()
│   │
│   ├── server/           # Express + Socket.IO
│   │   ├── services/     # roomService, gameService
│   │   └── socket/       # Room + Game handlers
│   │
│   └── client/           # React app
│       ├── pages/        # Login, Lobby, Room, Game
│       ├── components/   # GameBoard, PlayerList, CountdownTimer, DiceResult
│       ├── socket/       # Socket.IO client + useSocket hook
│       └── store/        # Zustand stores (auth, room, game)
```

## Game Flow

```
1. Login        → Nhập tên (guest, không cần password)
2. Lobby        → Tạo phòng (làm nhà cái) hoặc Vào phòng (nhập mã 6 ký tự)
3. Room         → Phòng chờ, nhà cái thấy danh sách người chơi
4. Game Start   → Nhà cái bấm "Bắt đầu"
5. Betting      → 15 giây countdown, người chơi đặt cược
6. Shake        → Hết giờ → Server tự xúc, animation 3s
7. Result       → Hiện kết quả, cập nhật điểm
8. Loop         → Quay lại bước 4
```

## Socket Events

### Client → Server

| Event | Payload | Mô tả |
|---|---|---|
| `room:create` | `{ playerName }` | Tạo phòng mới, trở thành nhà cái |
| `room:join` | `{ code, playerName }` | Vào phòng có sẵn |
| `room:leave` | - | Rời phòng |
| `game:start-round` | - | Nhà cái bắt đầu round (chỉ host) |
| `game:bet` | `{ bets: BetItem[] }` | Đặt cược |

### Server → Client

| Event | Payload | Mô tả |
|---|---|---|
| `room:created` | `{ room }` | Phòng đã được tạo |
| `room:joined` | `{ room }` | Đã vào phòng |
| `room:updated` | `{ room }` | Room state thay đổi |
| `room:player-joined` | `{ player }` | Có người mới vào |
| `room:player-left` | `{ playerId, newHostId? }` | Có người rời |
| `room:closed` | `{ reason }` | Phòng bị đóng |
| `game:round-started` | `{ countdown, roundNumber }` | Round bắt đầu |
| `game:countdown` | `{ countdown }` | Cập nhật thời gian |
| `game:bet-placed` | `{ playerId, playerName }` | Có người đặt cược |
| `game:shaking` | - | Đang xúc xắc |
| `game:result` | `{ result, room }` | Kết quả round |
| `error` | `{ message, code? }` | Lỗi |

## Scoring Logic

```typescript
// Luật chơi:
// - Mỗi mặt xúc xắc khớp với bet → trả lại tiền cược + tiền thưởng
// - Thưởng = bet * matchCount
// - Không khớp → mất tiền cược

// Ví dụ: Đặt 200 vào "cua", xúc xắc ra 2 con cua
// → Thắng: 200 (trả lại) + 200 * 2 (thưởng) = 600
// → Net win: 600 - 200 = 400
```

## Running the App

```bash
# Install dependencies
pnpm install

# Build shared package (required first time)
pnpm --filter @baucua/shared build

# Run both server and client
pnpm dev

# Or run separately
pnpm dev:server    # http://localhost:3001
pnpm dev:client    # http://localhost:3000
```

## Edge Cases

- **Host disconnect**: Chuyển host cho người tiếp theo hoặc đóng phòng
- **Player disconnect giữa round**: Bet bị hủy, trả lại điểm
- **Không ai đặt cược**: Skip round, thông báo
- **Player hết điểm (0)**: Vẫn ở phòng xem, không đặt được

## Future Improvements

- [ ] Database để lưu history, leaderboard
- [ ] Authentication thật (OAuth)
- [ ] Spectator mode
- [ ] Voice chat
- [ ] Mobile app (React Native)
