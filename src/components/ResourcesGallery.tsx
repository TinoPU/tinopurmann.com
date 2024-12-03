import ResourcePreview from "@/components/ui/resource_preview";


export default function ResourcesGallery() {
    return (
        <div className="justify-start gap-3 flex flex-col no-swipe">
            <div className="text-white text-2xl font-bold">Resources</div>
            <div className="flex flex-row gap-3 overflow-x-auto w-full pr-6 scrollbar-hidden">
                <ResourcePreview img_src="/assets/resources/tools.png" name="Tools" link="/resources/tools"/>
                <ResourcePreview img_src="/assets/resources/places.jpg" name="Places" link="/resources/places"/>
                <ResourcePreview img_src="/assets/resources/coffee.jpg" name="Newsletters" link=""/>
                <ResourcePreview img_src="/assets/resources/tools.png" name="Readings" link=""/>
                <ResourcePreview img_src="/assets/resources/tools.png" name="Learnings" link=""/>
            </div>
        </div>
    );
}