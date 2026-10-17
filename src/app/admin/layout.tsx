import type { Metadata } from "next";
export const metadata:Metadata={title:{default:"Admin | Vision",template:"%s | Vision Admin"},robots:{index:false,follow:false,nocache:true}};
export default function AdminRootLayout({children}:{children:React.ReactNode}){return <div className="min-h-svh bg-[#f2f1ed]">{children}</div>}
