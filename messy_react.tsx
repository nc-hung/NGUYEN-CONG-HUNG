// Delete children prop
// Use lhsPriority instead of  balancePriority  variable 
// Delete prices dependency 
// Missing style: class.row 

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain:'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo'; // Add this line 

}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances =  useWalletBalances();
  const prices = usePrices();

  const priorityMap = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };
  
  const getPriority = (blockchain: any): number => {
    return priorityMap[blockchain] ?? -99;
  };  

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
          if (balancePriority > -99) {
             if (balance.amount <= 0) {
               return true;
             }
          }
          return false
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
    });
  }, [balances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed() 
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        // className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

