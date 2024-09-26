import { Copy } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

import { AccountMenu } from "@/components/AccountMenu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts";
import { useCopyRoomUrlToClipboard } from "@/hooks";
import { Path } from "@/settings";
import { Room, User } from "@/types";

interface HeaderProps {
  room?: Room;
  users?: User[];
}

export const Header: FC<HeaderProps> = ({ room, users }) => {
  const { user } = useAuth();
  const { copyRoomUrlToClipboard } = useCopyRoomUrlToClipboard();

  const handleCopyRoomUrl = async () => {
    if (room) {
      await copyRoomUrlToClipboard(room.id);
    }
  };

  return (
    <header className="flex justify-between items-center h-14 px-4 border-b">
      <div className="flex items-center space-x-4">
        <Link to={Path.Home} className="text-lg font-semibold">
          Poker Planning 🃏
        </Link>
        {room && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <span>{room.id.split("-")[0]}</span>
            <Separator orientation="vertical" className="h-6" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyRoomUrl}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy room link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          {users && (
            <>
              <div className="flex -space-x-2">
                {users.slice(0, 5).map((user) => (
                  <Avatar key={user.id} className="border-2 border-background">
                    <AvatarFallback>
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {users.length > 5 && (
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>+{users.length - 5}</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <Separator orientation="vertical" className="h-6" />
            </>
          )}
          <AccountMenu />
        </div>
      )}
    </header>
  );
};
