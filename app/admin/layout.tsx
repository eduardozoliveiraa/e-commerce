
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "E-shop admin",
  description: "E-shop admnin dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
