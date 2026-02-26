# Bau Cua Online - Multiplayer Game

Game Bầu Cua truyền thống Việt Nam phiên bản multiplayer online realtime.

## Tech Stack

- **Monorepo**: Nx + pnpm workspaces
- **Client**: React 18, Rspack, Zustand, Tailwind CSS v4, React Router v7
- **Server**: Express + Socket.IO
- **Shared**: TypeScript types + game logic
- **Animation**: @react-spring/web (3D dice)
- **Language**: TypeScript

## Project Structure

```
packages/
├── shared/    # @baucua/shared - types, constants, game logic
├── server/    # @baucua/server - Express + Socket.IO (port 3001)
└── client/    # @baucua/client - React app (port 3000)
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
# Install dependencies
pnpm install

# Build shared package (required first time)
pnpm --filter @baucua/shared build
```

### Development

```bash
# Run both server + client
pnpm dev

# Or run separately
pnpm dev:server    # Server on port 3001
pnpm dev:client    # Client on port 3000
```

## Game Features

### Roles
- **Nhà cái (Host)**: Tạo phòng, bắt đầu round, xem người chơi đặt cược realtime
- **Người chơi**: Tham gia phòng, đặt cược vào các mặt (bầu, cua, tôm, cá, gà, nai)

### Game Flow
1. Login với tên → Lobby → Tạo/Tham gia phòng
2. Host bấm "Bắt đầu" → 15 giây đặt cược
3. Server tự động xúc xí ngầu → Hiển thị kết quả
4. Tính điểm: Thắng x2 (1 mặt trùng), x3 (2 mặt), x4 (3 mặt)

### Features
- Realtime multiplayer với Socket.IO
- Xúc xí ngầu 3D animation
- Rebuy khi hết tiền
- Host có 10,000$ (gấp 10 người chơi) để cover cược

## Learning Content

Project này cũng bao gồm các ví dụ học React Hook:

### Chapter 1: React Hook Basic
- useState, useEffect, useCallback, useMemo
- useReducer, useContext
- useSelector, useDispatch (Redux)

### Chapter 2: React Hook Animation - React Spring
- useSpring, useSprings, useTrail
- useTransition, useChain

### Chapter 3: Project Bau Cua Game
- Single-player version (legacy)
- Multiplayer online version (current)

## License

MIT
