import ContactGrid from "@/components/ContactGrid";
// import ProjectsGallery from "@/components/ProjectsGallery";
import ResourcesGallery from "@/components/ResourcesGallery";
import FindMe from "@/components/FindMe";
import DesktopCover from "@/components/DesktopCover";
import ProjectsGallery from "@/components/ProjectsGallery";
import ContactGridWrapper from "@/components/ContactGridWrapper";


export default function Home() {
    return (
        <div className="min-h-screen overflow-hidden flex flex-col md:flex-row pl-6 md:pl-8 pt-6 md:pt-8 pb-6 md:pb-8 md:pr-8 gap-6 no-swipe bg-mobileBG md:bg-background ">
            <div style={{display: "contents"}} >
                <ContactGridWrapper />
            </div>
            <div className="w-full md:w-auto md:flex-1 md:overflow-hidden">
            <div className="md:hidden">
                <ProjectsGallery />
            </div>
            <DesktopCover/>
            <div className="md:hidden">
                <ResourcesGallery/>
            </div>
            </div>
            <div className="w-full md:w-1/4">
                <FindMe />
            </div>
        </div>
    );
}
