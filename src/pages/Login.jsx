import AuthCard from "../components/AuthCard";
import PageShell from "../components/ui/PageShell";

const Login = () => {
  return (
    <PageShell className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-12">
      <AuthCard />
    </PageShell>
  );
};

export default Login;
