import { motion } from "framer-motion";
import { Stats } from "@/utils/types";

interface StatsProps {
    stat: Stats,
    index: number
}
const StatsComponnent = ({stat,index}:StatsProps) => {
    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, backgroundColor: "#eff6ff" }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-6 rounded-xl border border-gray-200"
        >
            <p className="text-5xl font-bold text-blue-600 mb-3">{stat.number}</p>
            <p className="text-xl text-gray-600">{stat.label}</p>
        </motion.div>
    )
}

export default StatsComponnent;
