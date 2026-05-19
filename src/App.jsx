import ReservationPage
from "./pages/ReservationPage";

import LoginPage
from "./pages/LoginPage";

function App() {

  const token =
    localStorage.getItem("token");

  return token

    ? <ReservationPage />

    : <LoginPage />;
}

export default App;