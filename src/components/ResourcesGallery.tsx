import ResourcePreview from "@/components/ui/resource_preview";


export default function ResourcesGallery() {
    return (
        <div className="justify-start gap-3 flex flex-col">
            <div className="text-white text-2xl font-bold">Resources</div>
            <div className="flex flex-row gap-3 overflow-x-auto w-full pr-6 scrollbar-hidden">
                <ResourcePreview img_src="/assets/resources/tools.png" name="Tools"/>
                <ResourcePreview img_src="/assets/resources/food.jpg" name="Food"/>
                <ResourcePreview img_src="/assets/resources/coffee.jpg" name="Coffee"/>
                <ResourcePreview img_src="/assets/resources/tools.png" name="Tools"/>
            </div>
        </div>
    );
}