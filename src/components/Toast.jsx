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
    <div className="fixed right-4 top-24 z-[100] w-[calc(100%-2rem)] max-w-sm animate-[toast-in_0.3s_ease-out]">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          ✓
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">
            Added to cart
          </p>

          <p className="mt-0.5 truncate text-xs text-slate-400">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(hideNotification())}
          className="text-slate-500 transition hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;