const HomeLayout = ({
  children,
  savedServices
}: Readonly<{
  children: React.ReactNode;
  savedServices: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-screen gap-4 flex items-center justify-center">
      {children}
      {savedServices}
    </div>
  )
}

export default HomeLayout