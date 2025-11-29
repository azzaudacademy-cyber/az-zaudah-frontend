import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PlusCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState<{ balance: number } | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [addFundsAmount, setAddFundsAmount] = useState(50);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Fetch wallet balance
        const { data: walletData, error: walletError } = await supabase
          .from('wallets')
          .select('balance')
          .eq('id', user.id)
          .single();

        if (walletError) toast.error("Failed to fetch wallet balance.");
        else setWallet(walletData);

        // Fetch transaction history
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (transactionsError) toast.error("Failed to fetch transaction history.");
        else setTransactions(transactionsData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAddFunds = async () => {
    // THIS IS A SIMULATION. A real implementation would use a payment provider.
    toast.info("Processing your deposit...", {
      description: "This is a simulation. No real money will be charged.",
    });

    // Simulate API call and update
    setTimeout(() => {
      const fee = addFundsAmount * 0.02; // 2% processing fee
      const netAmount = addFundsAmount - fee;
      const newBalance = (wallet?.balance || 0) + netAmount;

      setWallet({ balance: newBalance });
      
      // Add new transactions to the top of the list
      const newTransactions = [
        { type: 'deposit', amount: addFundsAmount, description: 'Wallet Deposit', created_at: new Date().toISOString() },
        { type: 'fee', amount: -fee, description: 'Processing Fee', created_at: new Date().toISOString() }
      ];
      setTransactions(prev => [...newTransactions, ...prev]);

      toast.success("Funds added successfully!", {
        description: `$${netAmount.toFixed(2)} has been added to your wallet after a $${fee.toFixed(2)} fee.`,
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Wallet</h1>

        {/* Balance and Add Funds */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Current Balance</CardTitle>
              <CardDescription>Available for booking sessions.</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero"><PlusCircle className="mr-2 h-4 w-4" /> Add Funds</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Funds to Your Wallet</DialogTitle>
                  <DialogDescription>
                    Enter the amount you'd like to add. A small processing fee (2%) is applied to cover transaction costs.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    value={addFundsAmount}
                    onChange={(e) => setAddFundsAmount(Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Processing Fee (2%): ${(addFundsAmount * 0.02).toFixed(2)}<br/>
                    Amount to be Added: ${(addFundsAmount * 0.98).toFixed(2)}
                  </p>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddFunds}>Proceed to Payment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold">
              ${loading ? '...' : (wallet?.balance || 0).toFixed(2)}
            </p>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={3} className="text-center">Loading history...</TableCell></TableRow>
                ) : transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(tx.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="flex items-center">
                        {tx.amount > 0 ? <ArrowUpRight className="h-4 w-4 mr-2 text-green-500"/> : <ArrowDownLeft className="h-4 w-4 mr-2 text-red-500"/>}
                        {tx.description}
                      </TableCell>
                      <TableCell className={`text-right font-medium ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={3} className="text-center">No transactions yet.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Wallet;