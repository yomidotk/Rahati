// Bottom safe area, including the web demo's phone frame.
// The demo page (showcase/) runs the app in an iframe that reaches the bottom edge of a fake
// phone, under its home line, and opens it with ?frame=1. The browser reports no safe area inside
// an iframe, so the app keeps clear of that line itself.
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FRAME_BOTTOM = 26; // height of the demo phone's home-line area

let framed = false;
if (Platform.OS === "web" && typeof window !== "undefined") {
  try {
    // the flag is in the first URL only; remember it for the pages that follow
    if (new URLSearchParams(window.location.search).has("frame")) sessionStorage.setItem("rahati.frame", "1");
    framed = sessionStorage.getItem("rahati.frame") === "1";
  } catch {
    framed = false;
  }
}

/** Space to keep free at the bottom of the screen (home indicator, gesture bar, demo frame). */
export function useBottomInset() {
  const insets = useSafeAreaInsets();
  return framed ? Math.max(insets.bottom, FRAME_BOTTOM) : insets.bottom;
}
