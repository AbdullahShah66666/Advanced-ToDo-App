import ToDoList from "@/components/toDoList";

export default function Home() {
 return (
  <div className='bg-gray-500 flex flex-col gap-2 items-center'>
   <h1 className='bg-amber-500 text-2xl font-semibold px-2 py-1'>
    To Do Lists
   </h1>
   <ToDoList />
   {/* <Button
    variant={"outline"}
    className='cursor-pointer w-30 hover:w-40 opacity-90 hover:opacity-100 transition-width duration-300'
   >
    Click Me
   </Button> */}
   {/* <TooltipProvider delayDuration={100}>
    <Tooltip>
     <TooltipPrimitive.Trigger asChild>
      <Button className='text-md font-semibold' variant='destructive'>
       Click To Show Tooltip
      </Button>
     </TooltipPrimitive.Trigger>
     <TooltipContent side='bottom' sideOffset={10}>
      <p className='bg-blue-600 rounded-3xl px-2 py-1 text-lg'>
       Yes!!! It's a tooltip, MAN!!!
      </p>
      <TooltipPrimitive.Arrow className='fill-red-600' width={10} height={8} />
     </TooltipContent>
    </Tooltip>
   </TooltipProvider> */}
  </div>
 );
}

// pnpm dlx shadcn@latest add [component]
