import Preview from "@/components/ui/preview";


export default function ProjectsGallery() {
    return (
        <div className="justify-start gap-3 flex flex-col">
            <div className="text-white text-2xl font-bold">Projects</div>
            <div className="flex flex-row gap-3 overflow-x-auto w-full pr-6 scrollbar-hidden">
                <Preview img_src="/assets/linkedin.svg" title="Linkedin" description="Testttets test test"/>
                <Preview img_src="/assets/linkedin.svg" title="Linkedin" description="Testttets test test"/>
                <Preview img_src="/assets/linkedin.svg" title="Linkedin" description="Testttets test test"/>
            </div>
        </div>
    );
}