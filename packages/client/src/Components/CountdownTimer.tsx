interface CountdownTimerProps {
  seconds: number;
}

export default function CountdownTimer({ seconds }: CountdownTimerProps) {
  const isUrgent = seconds <= 5;

  return (
    <div className="text-center py-4">
      <div
        className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 ${
          isUrgent
            ? 'border-red-500 bg-red-500/20'
            : 'border-amber-400 bg-amber-400/20'
        } transition-colors`}
      >
        <span
          className={`text-3xl sm:text-4xl font-bold ${
            isUrgent ? 'text-red-400 animate-pulse' : 'text-amber-400'
          }`}
        >
          {seconds}
        </span>
      </div>
      <p className="text-white/70 mt-2">
        {isUrgent ? 'Nhanh lên!' : 'Đặt cược đi!'}
      </p>
    </div>
  );
}
