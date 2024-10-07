type Props = {
    status: string;
  };
  
  export default function StatusRow({ status }: Props) {
    let color;
    switch (status.toLowerCase()) {
      case "alive":
        color = "bg-green-500";
        break;
      case "dead":
        color = "bg-red-500";
        break;
      case "unknown":
        color = "bg-gray-500";
        break;
    }
  
    return (
        <div className="flex items-center gap-1">
            <div className={`${color} rounded-full w-2 h-2 animate-pulse`}></div>
            <span className="capitalize">{status}</span>
        </div>
        
    ) 
  }
  