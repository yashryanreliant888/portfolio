interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="card border border-red-900/30 bg-red-950/10 p-6" role="alert">
      <div className="flex items-start gap-4">
        <svg
          className="w-6 h-6 text-red-400 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-200 mb-1">Error</h3>
          <p className="text-sm text-red-300">{message}</p>
          {retry && (
            <button
              onClick={retry}
              className="mt-3 text-sm text-red-400 hover:text-red-300 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
