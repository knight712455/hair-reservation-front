import { useState } from "react";
import { login } from "../api/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const result = await login(loginData);

      console.log("로그인 성공:", result);
      alert("로그인 성공!");

      // 백엔드에서 토큰을 주면 나중에 여기에 저장할 수 있음
      // localStorage.setItem("token", result.token);
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패. 서버 주소나 입력값을 확인해주세요.");
    }
  };

  return (
    <div>
      <h1>로그인</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>이메일</label>
          <br />
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>비밀번호</label>
          <br />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;