import ResourcePreview from "@/components/ui/resource_preview";


export default function ResourcesGallery() {
    return (
        <div className="justify-start gap-3 flex flex-col">
            <div className="text-white text-2xl font-bold">Resources</div>
            <div className="flex flex-row gap-3 overflow-x-auto w-full pr-6 scrollbar-hidden">
                <ResourcePreview img_src="/assets/linkedin.svg" name="Linkedin"/>
                <ResourcePreview img_src="/assets/linkedin.svg" name="Linkedin"/>
                <ResourcePreview img_src="/assets/linkedin.svg" name="Linkedin"/>
            </div>
        </div>
    );
}