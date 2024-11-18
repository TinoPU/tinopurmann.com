import ProjectPreview from "@/components/ui/project_preview";


export default function ProjectsGallery() {
    return (
        <div className="justify-start gap-3 flex flex-col">
            <div className="text-white text-2xl font-bold">Projects</div>
            <div className="flex flex-row gap-3 overflow-x-auto w-full pr-6 scrollbar-hidden">
                <ProjectPreview img_src="/assets/linkedin.svg" title="Linkedin" description="Testttets test test"/>
                <ProjectPreview img_src="/assets/linkedin.svg" title="Linkedin" description="Testttets test test"/>
                <ProjectPreview img_src="/assets/linkedin.svg" title="Linkedin" description="Testttets test test"/>
            </div>
        </div>
    );
}