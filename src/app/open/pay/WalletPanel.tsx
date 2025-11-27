// src/app/open/pay/WalletPanel.tsx

import QRCode from "react-qr-code";
import type { StableCurrency } from "./PayPageClient";

type WalletPanelProps = {
  currency: StableCurrency;
  address: string;
};

export default function WalletPanel({ currency, address }: WalletPanelProps) {
  const shortAddress =
    address && address.length >= 12 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address;

  const networkLabel = currency === "USDT" ? "Tron (TRC-20)" : "BNB Smart Chain (BEP-20)";

  const warningText =
    currency === "USDT"
      ? "This address only supports USDT on Tron (TRC-20). Do not send tokens from other networks."
      : "This address only supports USDC on BNB Smart Chain (BEP-20). Do not send tokens from other networks.";

  return (
    <div className="space-y-4">
      {/* Address block */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-gray-900">Wallet address</h2>
        <p className="mb-2 text-xs text-gray-500">
          Send the agreed amount in {currency} to the wallet address below. Always double-check the
          address and make sure you are using the correct network before sending.
        </p>

        <div className="rounded-xl border border-gray-200 bg-white px-3 py-2">
          <div className="mb-1 text-[11px] uppercase text-gray-500">{currency} address</div>

          <div className="break-all font-mono text-xs text-gray-900">{address}</div>

          {shortAddress !== address && (
            <div className="mt-1 text-[11px] text-gray-500">Short: {shortAddress}</div>
          )}

          <div className="mt-2 text-[11px] text-gray-500">
            Network: <span className="font-medium">{networkLabel}</span>
          </div>

          <p className="mt-1 text-[11px] text-red-600">{warningText}</p>
        </div>
      </div>

      {/* QR block */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-4">
        <p className="mb-3 text-[11px] text-gray-500">
          Scan this QR code with your wallet to send {currency}.
        </p>

        <div className="rounded-xl bg-white p-3 shadow-sm">
          <QRCode
            value={address}
            size={144}
            style={{
              height: "auto",
              maxWidth: "100%",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* Legal note */}
      <p className="text-[11px] leading-relaxed text-gray-500">
        Payments sent to this address are strictly for my professional services (consulting,
        integration and transaction support). I do not store, exchange or transfer digital assets on
        behalf of clients.
      </p>
    </div>
  );
}
