import { ImageResponse } from "next/og";
export const size={width:64,height:64};export const contentType="image/png";
export default function Icon(){return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"#16231d",color:"#d2ae78",fontSize:45,fontFamily:"Georgia",fontWeight:600}}>V</div>,size);}
