import Layout from "@/components/Layout";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, Admin! This page is only accessible to users with the 'admin' role.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;