export function StatusBar() {
  return (
    <div className="w-full px-4 py-2 flex justify-between items-center text-black">
      <div>9:41</div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-4">•••</div>
        <div className="h-3 w-4">📶</div>
        <div className="h-3 w-6">🔋</div>
      </div>
    </div>
  )
}
