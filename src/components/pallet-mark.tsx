export function PalletMark({ variant = "terracotta" }: { variant?: string }) {
  return <span className={`pallet-mark pallet-mark-${variant}`} aria-hidden="true"><i /><i /><i /><b /><b /><b /></span>;
}
