export function MainBody(props: any) {
    return <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-1 flex-col gap-5 px-4 py-4 pb-[calc(5rem+env(safe-area-inset-bottom))]">
      <div className="relative pb-24">
        {props.children}
    </div>
    </div>
} 