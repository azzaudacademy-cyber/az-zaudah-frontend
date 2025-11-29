import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { User, Factor } from "@supabase/supabase-js";

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [factors, setFactors] = useState<Factor[]>([]);
  const [newFactor, setNewFactor] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setFullName(user?.user_metadata.full_name || "");
      setLoading(false);

      // Fetch MFA factors
      const { data: factorsData } = await supabase.auth.mfa.listFactors();
      if (factorsData) setFactors(factorsData.all);
    };
    fetchUser();
  }, []);

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });
    if (error) {
      toast.error("Failed to update name.", { description: error.message });
    } else {
      toast.success("Your name has been updated successfully.");
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("Failed to update password.", { description: error.message });
    } else {
      toast.success("Your password has been updated successfully.");
      (e.target as HTMLFormElement).reset();
    }
    setLoading(false);
  };

  const handleEnable2FA = async () => {
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
    if (error) {
      return toast.error("Failed to start 2FA enrollment.", { description: error.message });
    }
    setNewFactor(data);
  };

  const handleVerify2FA = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;

    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: newFactor.id,
      code,
    });

    if (error) {
      toast.error("Failed to verify 2FA.", { description: error.message });
    } else {
      toast.success("Two-Factor Authentication has been enabled.");
      setNewFactor(null);
      // Refresh factors list
      const { data: factorsData } = await supabase.auth.mfa.listFactors();
      if (factorsData) setFactors(factorsData.all);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    const { error } = await supabase.functions.invoke('delete-user');

    if (error) {
      toast.error("Failed to delete account.", { description: error.message });
    } else {
      toast.success("Your account has been scheduled for deletion.");
      await supabase.auth.signOut();
    }
    setLoading(false);
  };

  const totpFactor = factors.find(f => f.factor_type === 'totp' && f.status === 'verified');

  if (loading) {
    return <Layout><div className="container p-8">Loading settings...</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <div className="space-y-8">
          {/* Update Name Card */}
          <Card>
            <CardHeader>
              <CardTitle>Update Your Name</CardTitle>
              <CardDescription>This is the name that will be displayed on your profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateName} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Name"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Update Password Card */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Choose a new password for your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Password"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 2FA Card */}
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              {totpFactor ? (
                <p className="text-sm text-green-600 font-semibold">2FA is currently enabled.</p>
              ) : newFactor ? (
                <div className="space-y-4">
                  <p>Scan the QR code with your authenticator app, then enter the code below.</p>
                  <div dangerouslySetInnerHTML={{ __html: newFactor.totp.qr_code }} />
                  <form onSubmit={handleVerify2FA} className="flex items-end gap-2">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="code">Verification Code</Label>
                      <Input id="code" name="code" required />
                    </div>
                    <Button type="submit">Verify & Enable</Button>
                  </form>
                </div>
              ) : (
                <Button onClick={handleEnable2FA}>Enable 2FA</Button>
              )}
            </CardContent>
          </Card>

          {/* Delete Account Card */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Delete Account</CardTitle>
              <CardDescription>Permanently delete your account and all associated data. This action cannot be undone.</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete My Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action is permanent and cannot be reversed. All your data, including course progress and payment history, will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount}>
                      Yes, Delete My Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;