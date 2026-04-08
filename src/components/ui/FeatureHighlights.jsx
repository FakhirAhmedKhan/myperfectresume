import { AwardIcon, CpuIcon, LayoutIcon } from '@/CustomIcons'
import { FeatureCard } from '@/index'

const FeatureHighlights = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl w-full mt-4 mb-1">
            <FeatureCard
                icon={<LayoutIcon className="text-blue-600" size={32} />}
                title="Smart CV Builder"
                description="Dynamic sections, real-time preview, and polished templates designed for today's market."
            />
            <FeatureCard
                icon={<CpuIcon className="text-purple-600" size={32} />}
                title="ATS Optimizer"
                description="Our rule-based engine scans your content for keywords, formatting, and critical sections."
            />
            <FeatureCard
                icon={<AwardIcon className="text-green-600" size={32} />}
                title="Privacy First"
                description="No servers, no tracking. All your data stays locally in your browser for 100% privacy."
            />
        </div>
    )
}

export default FeatureHighlights