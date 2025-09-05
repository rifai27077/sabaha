"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/SabawashCheckout";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { CreditCard, Wallet } from "lucide-react";

const upiOptions = [
  { id: "paytm", label: "Paytm UPI", logo: "/images/sabawash/payments/paytm.png" },
  { id: "phonepe", label: "PhonePe", logo: "/images/sabawash/payments/phonepe.png" },
  { id: "gpay", label: "GPay", logo: "/images/sabawash/payments/gpay.png" },
];

const savedCards = [
  { id: "card_2575", label: "************2575", brand: "/images/sabawash/payments/mastercard.png" },
];

export default function PaymentPage() {
  const router = useRouter();
  const { order, setOrder } = useOrder();

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const isDoneEnabled = !!selected && !loading;

   const handleDone = () => {
  if (!selected) return;

  const updated = {
    ...(order || {}),
    paymentMethod: selected,
    total: order?.itemTotal - order?.discount + order?.serviceFee, // ✅ simpan total
    status: "processing",
  };
  setOrder(updated);

  setLoading(true);

  setTimeout(() => {
    const finalOrder = { ...updated, status: "paid", receiptId: Date.now() };
    setOrder(finalOrder);
    router.push(`/sabawash/receipt/${finalOrder.receiptId}`);
  }, 1500);
};


  const Logo = ({ src, alt }) => (
    <div className="w-8 h-8 flex items-center justify-center">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={28}
          height={28}
          className="object-contain"
        />
      ) : (
        <span className="text-sm">🏦</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header variant="logo" showChat showSettings />

      <div className="max-w-3xl mx-auto px-4 pb-36 pt-6">
        {/* UPI Section */}
        <section className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">UPI</h4>
          <div className="space-y-3">
            {upiOptions.map((u) => {
              const value = `upi_${u.id}`;
              const active = selected === value;
              return (
                <label
                  key={u.id}
                  htmlFor={value}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-shadow ${
                    active
                      ? "ring-2 ring-[#2b6cb0] border-transparent shadow"
                      : "border-gray-200"
                  } cursor-pointer bg-white`}
                  onClick={() => setSelected(value)}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={selected === value}
                      onChange={() => setSelected(value)}
                      className="w-4 h-4 text-[#1A3D8F] focus:ring-[#1A3D8F]"
                    />
                    <span className="text-sm text-gray-800">{u.label}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      id={value}
                      name="payment"
                      type="radio"
                      checked={active}
                      onChange={() => setSelected(value)}
                      className="sr-only"
                    />
                    <Logo src={u.logo} alt={u.label} />
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Cards</h4>
          <div className="space-y-3">
            {savedCards.map((c) => {
              const value = `card_${c.id}`;
              const active = selected === value;
              return (
                <label
                  key={c.id}
                  htmlFor={value}
                  className={`flex items-center justify-between p-4 rounded-xl border bg-white ${
                    active
                      ? "ring-2 ring-[#2b6cb0] border-transparent shadow"
                      : "border-gray-200"
                  } cursor-pointer`}
                  onClick={() => setSelected(value)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-sm text-gray-800">{c.label}</div>
                  </div>
                  <Logo src={c.brand} alt="card brand" />
                  <input
                    id={value}
                    name="payment"
                    type="radio"
                    checked={active}
                    onChange={() => setSelected(value)}
                    className="sr-only"
                  />
                </label>
              );
            })}
          </div>
        </section>

        {/* Cash Section */}
        <section className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Cash</h4>
          <label
            htmlFor="cash"
            className={`flex items-center justify-between p-4 rounded-xl border bg-white ${
              selected === "cash"
                ? "ring-2 ring-[#2b6cb0] border-transparent shadow"
                : "border-gray-200"
            } cursor-pointer`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-sm text-gray-800">Cash</div>
            </div>
            <input
              id="cash"
              name="payment"
              type="radio"
              checked={selected === "cash"}
              onChange={() => setSelected("cash")}
              className="sr-only"
            />
          </label>
        </section>
      </div>

      {/* bottom fixed action + navigation */}
      <div className="fixed left-0 right-0 bottom-0 z-40">
        {/* button bar */}
        <div className="max-w-3xl mx-auto px-4 pb-20">
          <button
            onClick={handleDone}
            disabled={!isDoneEnabled}
            className={`w-full rounded-xl py-3 font-semibold flex justify-center items-center gap-2 transition ${
              isDoneEnabled
                ? "bg-[#283891] text-white hover:bg-[#25588f]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Done"
            )}
          </button>
        </div>
        <Navigation active="home" />
      </div>
    </div>
  );
}
