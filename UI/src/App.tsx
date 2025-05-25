import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Components/ts/Tooltip';

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent side="top">
            This is a tooltip!
            <TooltipArrow className="fill-white" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
