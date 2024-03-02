import { Button } from "@nextui-org/react";
import Logo from "./logo";
import TabLabel from "./tab-label";

const Navbar = () => {
  return (
    <nav
      className={`w-full px-40 py-5 flex justify-between items-center bg-center bg-black backdrop-blur-2xl bg-opacity-10 "`}
    >
      <Logo />
      <TabLabel />
      <div className="flex gap-4 flex-row">
        <Button
          //   onPress={onOpen}
          color="secondary"
          variant="flat"
          className="text-purple-500"
        >
          Login
        </Button>
        <Button
          as={Button}
          color="danger"
          //   onPress={onOpen}
          variant="flat"
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
