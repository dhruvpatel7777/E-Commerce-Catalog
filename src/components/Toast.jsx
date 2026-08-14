import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideNotification } from "../redux/notificationSlice";

function Toast() {
  const dispatch = useDispatch();

  const message = useSelector(
    (state) => state.notification.message
  );

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      dispatch(hideNotification());
    }, 2500);

    return () => clearTimeout(timer);
  }, [message, dispatch]);

  if (!message) {
    return null;
  }

  return (
    <div className="fixed top-24 bottom-5 right-4 z-[9999] w-[calc(100%-2rem)] max-w-sm animate-[toast-in_0.35s_ease-out] sm:bottom-6 sm:right-6">
<div className="relative overflow-hidden rounded-2xl border border-slate-300/80 bg-slate-100/95 p-4 shadow-[0_20px_50px_rgba(51,45,90,0.22)] backdrop-blur-xl">

        {/* Purple Accent */}
        

        <div className="flex items-center gap-3 pl-1">

          {/* Success Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-200 text-violet-700 shadow-sm">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12l4 4L19 6"
              />
            </svg>
          </div>

          {/* Message */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-950">
              Added to cart
            </p>

           <p className="mt-0.5 truncate text-xs font-medium text-slate-600">
              {message}
            </p>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => dispatch(hideNotification())}
            aria-label="Close notification"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg font-medium text-slate-500 transition hover:bg-white hover:text-slate-900"
          >
            ×
          </button>

        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-violet-100">
          <div className="h-full w-full origin-left animate-[toast-progress_2.5s_linear_forwards] bg-violet-600" />
        </div>

      </div>
    </div>
  );
}

export default Toast;