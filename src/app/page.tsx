
import Image from "next/image";

export default function Home() {
    const r = [1, 2, 3];
  return (
    <div className="h-[100vh] w-full bg-black items-center justify-center flex flex-col">
      <div className="flex flex-row gap-6">
          {r.map((i) => (
              <div key={i} className="w-[30px] h-[30px] bg-white"></div>
          ))}
      </div>
        <div className="flex flex-row gap-6 absolute bottom-36">
            <a href="https://www.linkedin.com/in/tinopurmann/">
                <Image priority={true} src="/linkedin.svg" alt="LinkedIn Profile" width={40} height={40}/>
            </a>
            <a href="https://calendly.com/tino-p1q/30min">
                <Image src="/calendly.svg" alt="Schedule with Calendly" width={40} height={40} className="bg-white"/>
            </a>
        </div>
    </div>
  );
}
