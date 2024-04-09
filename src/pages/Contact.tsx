import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function Contact() {
  const { toast } = useToast();

  const [fromValue, setFromValue] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fromValue.name || !fromValue.email || !fromValue.message) {
      toast({
        variant: "destructive",
        title: "Please fill all the fields",
        description: "Name, Email and Message are required",
        duration: 1000,
      });
      return;
    }
    console.log(fromValue);
  };
  return (
    <div className="h-[calc(100vh-80px)] w-full px-5 select-none">
      <div className="w-full lg:w-1/2 mx-auto h-full flex justify-start flex-col  space-y-4 mt-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Contact</h1>
          <p className="text-zinc-400 text-base">Feel free to contact</p>
        </div>
        <div className="w-full lg:px-20">
          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md bg-transparent focus:bg-white/15"
              value={fromValue.name}
              onChange={(e) =>
                setFromValue({ ...fromValue, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md bg-transparent focus:bg-white/15"
              value={fromValue.email}
              onChange={(e) =>
                setFromValue({ ...fromValue, email: e.target.value })
              }
            />
            <textarea
              placeholder="Message"
              className="w-full p-2 border border-gray-300 rounded-md bg-transparent focus:bg-white/15"
              value={fromValue.message}
              onChange={(e) =>
                setFromValue({ ...fromValue, message: e.target.value })
              }
              lang="en"
            ></textarea>
            <button className="w-full p-2 bg-blue-500 hover:bg-blue-800 text-white rounded-md transition-all duration-300 ease-in-out">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
