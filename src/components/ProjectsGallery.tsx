import ProjectPreview from "@/components/ui/project_preview";
import {Project} from "@/lib/interfaces";

export default function ProjectsGallery({projects}: {projects: Project[]}) {
    return (
        <div className="justify-start gap-3 flex flex-col no-swipe">
            <div className="text-white text-2xl font-bold">Projects</div>
            <div className="flex flex-row gap-3 overflow-x-auto w-full pr-6 scrollbar-hidden">
                {projects.map((project: Project) => (
                    <ProjectPreview
                        key={project.id}
                        img_src={project.imageUrl}
                        title={project.title}
                        description={project.description}
                    />
                ))}
            </div>
        </div>
    );
}