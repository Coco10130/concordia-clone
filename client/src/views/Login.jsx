import LoginCard from "../components/LoginCard";

const Login = () => {
  return (
    <>
      <div
        className="text-white h-[100vh] flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <LoginCard />
      </div>
    </>
  );
};

export default Login;
