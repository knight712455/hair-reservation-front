import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <h1>헤어샵 예약 서비스</h1>

      <div>
        <a href="/login">로그인</a>
        {" | "}
        <a href="/signup">회원가입</a>
      </div>

      <hr />

      {window.location.pathname === "/login" && <Login />}
      {window.location.pathname === "/signup" && <Signup />}
      {window.location.pathname === "/" && (
        <div>
          <h2>메인 페이지</h2>
          <p>로그인 또는 회원가입을 선택해주세요.</p>
        </div>
      )}
    </div>
  );
}

export default App;