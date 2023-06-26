import Chat from "@/components/chatpage";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";


export default function Home() {
  const { address, isConnected } = useAccount();
  if (!isConnected)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
  <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
    <h1 className="text-lg font-bold mb-4 lg:mb-0 lg:col-span-4">Connect your wallet to send a message</h1>
    <div className="flex justify-center">
      <ConnectButton />
    </div>
  </div>
</main>
    );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
      <h1 className="text-2xl font-bold mb-4 lg:mb-0 lg:col-span-4 pb-6">Send a message</h1>
      <div className="flex justify-center">
      <Chat/>
      </div>
    </div>
  </main>
  )
}

