export function StatusBar() {
  return (
    <div className="flex justify-between items-center px-6 py-3 text-black">
      <div>9:41</div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.01 21.49L23.64 7C23.19 6.66 18.71 3 12 3C5.28 3 0.81 6.66 0.36 7L12.01 21.49Z" fill="black" />
          </svg>
        </div>
        <div className="h-3 w-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 8.5H3V15.5H1V8.5ZM5.5 5H7.5V19H5.5V5ZM10 8.5H12V15.5H10V8.5ZM14.5 5H16.5V19H14.5V5ZM19 8.5H21V15.5H19V8.5Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="h-3 w-8 relative">
          <div className="absolute inset-0 border border-black rounded-sm"></div>
          <div className="absolute inset-y-0 left-0 right-2 bg-black rounded-sm"></div>
        </div>
      </div>
    </div>
  )
}
