import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const response = await fetch(

        "http://localhost:8080/auth/login",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            email,
            password,

          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        alert(
          data.message ||
          "로그인 실패"
        );

        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      alert("로그인 성공");

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("서버 오류");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f5f1ee]">

      <div className="bg-white p-10 rounded-3xl shadow-sm w-[400px]">

        <h1 className="text-4xl font-bold mb-8 text-center">

          SalonBook

        </h1>

        <div className="space-y-4">

          <input
            type="email"

            placeholder="이메일"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="w-full border rounded-xl p-4"
          />

          <input
            type="password"

            placeholder="비밀번호"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            className="w-full border rounded-xl p-4"
          />

          <button
            onClick={handleLogin}

            className="
              w-full
              bg-black
              text-white
              py-4
              rounded-xl
              font-semibold
            "
          >

            로그인

          </button>

        </div>

      </div>

    </div>
  );
}