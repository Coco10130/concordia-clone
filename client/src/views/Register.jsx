import RegisterCard from "../components/RegisterCard";
const Register = () => {
  return (
    <>
      <div
        className="text-white h-[100vh] flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <RegisterCard />
      </div>
    </>
  );
};

export default Register;
