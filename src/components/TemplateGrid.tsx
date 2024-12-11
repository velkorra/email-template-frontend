import { ReactNode } from "react"

const TemplateGrid: React.FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className="template-grid">
            {children}
        </div>
    )
}

export default TemplateGrid;