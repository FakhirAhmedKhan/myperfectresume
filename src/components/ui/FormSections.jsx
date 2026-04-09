import { m, AnimatePresence } from "framer-motion";
import { PlusIcon, TrashIcon } from "../../index";
import React from "react";

export const Section = React.memo(({ title, icon, children }) => (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-800">
                {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        {children}
    </div>
));

export const DynamicSection = React.memo(({ title, icon, items = [], onAdd, onRemove, onUpdate, renderItem }) => (
    <Section title={title} icon={icon}>
        <div className="flex flex-col gap-4">
            <AnimatePresence>
                {items && items.length > 0 ? (
                    items.map((item) => (
                        <m.div
                            key={item.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-5 border dark:border-gray-800 rounded-2xl relative group bg-gray-50/30 dark:bg-gray-800/30"
                        >
                            <button
                                onClick={() => onRemove(item.id)}
                                className="absolute -top-2 -right-2 p-2 bg-red-50 text-red-500 rounded-full border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-500 hover:text-white"
                            >
                                <TrashIcon size={14} />
                            </button>
                            {renderItem(item, (newData) => onUpdate(item.id, { ...item, ...newData }))}
                        </m.div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-400 text-sm italic border-2 border-dashed border-gray-50 dark:border-gray-800/50 rounded-2xl">
                        No {title} added yet. Click the button below to add one.
                    </div>
                )}
            </AnimatePresence>
            <button
                onClick={onAdd}
                className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-2 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
            >
                <PlusIcon size={20} />
                Add {title} Entry
            </button>
        </div>
    </Section>
));

export default DynamicSection;