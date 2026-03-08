(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/PromoteEventModal.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PromoteEventModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// components/PromoteEventModal.jsx
'use client';
;
function PromoteEventModal({ message, groupId, onClose, onPromoted }) {
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        description: '',
        location: '',
        dateTime: '',
        visibility: 'public'
    });
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleChange = (e)=>setForm((prev)=>({
                ...prev,
                [e.target.name]: e.target.value
            }));
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!form.title.trim()) {
            setError('Title is required');
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch(`/api/messages/${message._id}/promote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Failed');
                return;
            }
            onPromoted(data.event);
        } catch  {
            setError('Network error');
        } finally{
            setSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '1rem'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fb-card",
            style: {
                width: '100%',
                maxWidth: '440px',
                background: 'var(--fb-surface)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '1.25rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid var(--fb-border)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    margin: 0,
                                    fontSize: '1.125rem',
                                    fontWeight: '700',
                                    color: 'var(--fb-text)'
                                },
                                children: "📅 Promote to Event"
                            }, void 0, false, {
                                fileName: "[project]/components/PromoteEventModal.jsx",
                                lineNumber: 52,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                style: {
                                    background: 'var(--fb-surface2)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    cursor: 'pointer',
                                    color: 'var(--fb-text-secondary)',
                                    fontSize: '1.25rem',
                                    lineHeight: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background 0.15s'
                                },
                                onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--fb-surface3)',
                                onMouseLeave: (e)=>e.currentTarget.style.background = 'var(--fb-surface2)',
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/components/PromoteEventModal.jsx",
                                lineNumber: 53,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PromoteEventModal.jsx",
                        lineNumber: 51,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'var(--fb-surface2)',
                            borderLeft: '3px solid var(--fb-blue)',
                            borderRadius: '0 8px 8px 0',
                            padding: '0.625rem 0.875rem',
                            marginBottom: '1.25rem',
                            fontSize: '0.9375rem',
                            color: 'var(--fb-text-secondary)',
                            fontStyle: 'italic'
                        },
                        children: [
                            '"',
                            message.text,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PromoteEventModal.jsx",
                        lineNumber: 70,
                        columnNumber: 21
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(240,40,73,0.12)',
                            border: '1px solid rgba(240,40,73,0.3)',
                            color: 'var(--fb-red)',
                            borderRadius: '8px',
                            padding: '0.5rem 0.875rem',
                            marginBottom: '1rem',
                            fontSize: '0.875rem'
                        },
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/PromoteEventModal.jsx",
                        lineNumber: 84,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '0.875rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '0.8125rem',
                                            fontWeight: '600',
                                            color: 'var(--fb-text-secondary)',
                                            marginBottom: '0.375rem'
                                        },
                                        children: "Event Title *"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 95,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        name: "title",
                                        type: "text",
                                        placeholder: "e.g. Friday Night Hangout",
                                        value: form.title,
                                        onChange: handleChange,
                                        required: true,
                                        className: "fb-input"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 96,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PromoteEventModal.jsx",
                                lineNumber: 94,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '0.875rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '0.8125rem',
                                            fontWeight: '600',
                                            color: 'var(--fb-text-secondary)',
                                            marginBottom: '0.375rem'
                                        },
                                        children: "Description"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 102,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "description",
                                        placeholder: "Details about the event...",
                                        rows: 2,
                                        value: form.description,
                                        onChange: handleChange,
                                        className: "fb-input",
                                        style: {
                                            resize: 'none',
                                            height: 'auto'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 103,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PromoteEventModal.jsx",
                                lineNumber: 101,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '0.75rem',
                                    marginBottom: '0.875rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: 'block',
                                                    fontSize: '0.8125rem',
                                                    fontWeight: '600',
                                                    color: 'var(--fb-text-secondary)',
                                                    marginBottom: '0.375rem'
                                                },
                                                children: "Date & Time"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PromoteEventModal.jsx",
                                                lineNumber: 111,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                name: "dateTime",
                                                type: "datetime-local",
                                                value: form.dateTime,
                                                onChange: handleChange,
                                                className: "fb-input"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PromoteEventModal.jsx",
                                                lineNumber: 112,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 110,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: 'block',
                                                    fontSize: '0.8125rem',
                                                    fontWeight: '600',
                                                    color: 'var(--fb-text-secondary)',
                                                    marginBottom: '0.375rem'
                                                },
                                                children: "Location"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PromoteEventModal.jsx",
                                                lineNumber: 117,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                name: "location",
                                                type: "text",
                                                placeholder: "Where?",
                                                value: form.location,
                                                onChange: handleChange,
                                                className: "fb-input"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PromoteEventModal.jsx",
                                                lineNumber: 118,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 116,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PromoteEventModal.jsx",
                                lineNumber: 109,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '1.25rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '0.8125rem',
                                            fontWeight: '600',
                                            color: 'var(--fb-text-secondary)',
                                            marginBottom: '0.375rem'
                                        },
                                        children: "Visibility"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 125,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        name: "visibility",
                                        value: form.visibility,
                                        onChange: handleChange,
                                        className: "fb-input",
                                        style: {
                                            cursor: 'pointer'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "public",
                                                children: "🌐 Public — all group members"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PromoteEventModal.jsx",
                                                lineNumber: 128,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "private",
                                                children: "🔒 Private — invite only"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PromoteEventModal.jsx",
                                                lineNumber: 129,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 126,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PromoteEventModal.jsx",
                                lineNumber: 124,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '0.625rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onClose,
                                        className: "btn-secondary",
                                        style: {
                                            flex: 1
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 134,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: submitting,
                                        className: "btn-primary",
                                        style: {
                                            flex: 1
                                        },
                                        children: submitting ? 'Creating…' : 'Create Event'
                                    }, void 0, false, {
                                        fileName: "[project]/components/PromoteEventModal.jsx",
                                        lineNumber: 137,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PromoteEventModal.jsx",
                                lineNumber: 133,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PromoteEventModal.jsx",
                        lineNumber: 93,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PromoteEventModal.jsx",
                lineNumber: 49,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/PromoteEventModal.jsx",
            lineNumber: 48,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/PromoteEventModal.jsx",
        lineNumber: 41,
        columnNumber: 9
    }, this);
}
_s(PromoteEventModal, "QYAuM7K9Wp6CKIX+UWZkIZL5QLI=");
_c = PromoteEventModal;
var _c;
__turbopack_context__.k.register(_c, "PromoteEventModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/groups/[id]/chat/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useAuth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PromoteEventModal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PromoteEventModal.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
// app/groups/[id]/chat/page.jsx
'use client';
;
;
;
;
;
function ChatPage() {
    _s();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { id: groupId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeThread, setActiveThread] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [replies, setReplies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [promoteTarget, setPromoteTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [replyToMessage, setReplyToMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // For inline WhatsApp-style replies
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            if (!loading && !user) router.push('/login');
        }
    }["ChatPage.useEffect"], [
        user,
        loading
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            if (!user || !groupId) return;
            fetchMessages();
            const interval = setInterval(fetchMessages, 5000);
            return ({
                "ChatPage.useEffect": ()=>clearInterval(interval)
            })["ChatPage.useEffect"];
        }
    }["ChatPage.useEffect"], [
        user,
        groupId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ChatPage.useEffect"], [
        messages
    ]);
    const fetchMessages = async ()=>{
        try {
            const res = await fetch(`/api/messages?groupId=${groupId}`);
            const data = await res.json();
            if (data.messages) setMessages(data.messages);
        } catch  {}
    };
    const sendMessage = async (e)=>{
        e.preventDefault();
        if (!text.trim()) return;
        setSending(true);
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    groupId,
                    text: text.trim(),
                    replyTo: replyToMessage ? replyToMessage._id : undefined
                })
            });
            const data = await res.json();
            if (res.ok) {
                setMessages((prev)=>[
                        ...prev,
                        data.message
                    ]);
                setText('');
                setReplyToMessage(null);
            }
        } catch  {} finally{
            setSending(false);
        }
    };
    const loadReplies = async (messageId)=>{
        if (activeThread === messageId) {
            setActiveThread(null);
            return;
        }
        setActiveThread(messageId);
        try {
            const res = await fetch(`/api/messages/${messageId}/reply`);
            const data = await res.json();
            setReplies((prev)=>({
                    ...prev,
                    [messageId]: data.replies || []
                }));
        } catch  {}
    };
    const sendReply = async (messageId, replyText)=>{
        try {
            const res = await fetch(`/api/messages/${messageId}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: replyText
                })
            });
            const data = await res.json();
            if (res.ok) {
                setReplies((prev)=>({
                        ...prev,
                        [messageId]: [
                            ...prev[messageId] || [],
                            data.reply
                        ]
                    }));
                setMessages((prev)=>prev.map((m)=>m._id === messageId ? {
                            ...m,
                            replyCount: (m.replyCount || 0) + 1
                        } : m));
            }
        } catch  {}
    };
    const formatTime = (dateStr)=>{
        const d = new Date(dateStr);
        return d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const formatDate = (dateStr)=>{
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    };
    const grouped = messages.reduce((acc, msg)=>{
        const date = new Date(msg.createdAt).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(msg);
        return acc;
    }, {});
    if (loading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            height: '100vh',
            width: '100%',
            background: '#0a0e14',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minWidth: 0,
                    transition: 'all 0.3s'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: '#1c1e22',
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderBottom: '1px solid #2a2f38',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/dashboard",
                                        style: {
                                            color: 'var(--fb-text-secondary)',
                                            textDecoration: 'none',
                                            fontSize: '1.5rem',
                                            lineHeight: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.25rem'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.color = '#1877f2',
                                        onMouseLeave: (e)=>e.currentTarget.style.color = 'var(--fb-text-secondary)',
                                        children: "←"
                                    }, void 0, false, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 145,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            flexShrink: 0
                                        },
                                        children: "💬"
                                    }, void 0, false, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 159,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    margin: 0,
                                                    fontSize: '1.125rem',
                                                    fontWeight: '600',
                                                    color: '#e4e6eb'
                                                },
                                                children: "Group Chat"
                                            }, void 0, false, {
                                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                lineNumber: 175,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    margin: 0,
                                                    fontSize: '0.75rem',
                                                    color: '#8a8d91'
                                                },
                                                children: "Tap message for thread"
                                            }, void 0, false, {
                                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                lineNumber: 176,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 174,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                lineNumber: 144,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '0.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/groups/${groupId}/moments`,
                                        style: {
                                            fontSize: '0.875rem',
                                            background: '#2a2f38',
                                            color: '#8a8d91',
                                            padding: '0.5rem 0.875rem',
                                            borderRadius: '20px',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            border: '1px solid #3a3f48',
                                            transition: 'all 0.2s'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = '#3a3f48';
                                            e.currentTarget.style.color = '#e4e6eb';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = '#2a2f38';
                                            e.currentTarget.style.color = '#8a8d91';
                                        },
                                        children: "📸 Moments"
                                    }, void 0, false, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 180,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/groups/${groupId}/events`,
                                        style: {
                                            fontSize: '0.875rem',
                                            background: '#2a2f38',
                                            color: '#8a8d91',
                                            padding: '0.5rem 0.875rem',
                                            borderRadius: '20px',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            border: '1px solid #3a3f48',
                                            transition: 'all 0.2s'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = '#3a3f48';
                                            e.currentTarget.style.color = '#e4e6eb';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = '#2a2f38';
                                            e.currentTarget.style.color = '#8a8d91';
                                        },
                                        children: "📅 Events"
                                    }, void 0, false, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 198,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                lineNumber: 179,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                        lineNumber: 134,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1rem',
                            background: 'linear-gradient(to bottom, #0a0e14 0%, #0d1117 100%)',
                            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(24, 119, 242, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(24, 119, 242, 0.03) 0%, transparent 50%)'
                        },
                        children: [
                            Object.entries(grouped).map(([date, msgs])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '1.5rem 0 1rem'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#1c1e22',
                                                    padding: '0.375rem 0.875rem',
                                                    borderRadius: '8px',
                                                    fontSize: '0.75rem',
                                                    color: '#8a8d91',
                                                    fontWeight: '500',
                                                    boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                                                },
                                                children: formatDate(msgs[0].createdAt)
                                            }, void 0, false, {
                                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                lineNumber: 231,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                            lineNumber: 230,
                                            columnNumber: 29
                                        }, this),
                                        msgs.map((msg)=>{
                                            const isOwn = msg.userId?._id === user?.userId || msg.userId?.toString() === user?.userId;
                                            const isThreadOpen = activeThread === msg._id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "chat-msg-group",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '0.5rem',
                                                        flexDirection: isOwn ? 'row-reverse' : 'row',
                                                        marginBottom: '0.5rem',
                                                        maxWidth: '85%',
                                                        marginLeft: isOwn ? 'auto' : '0',
                                                        marginRight: isOwn ? '0' : 'auto'
                                                    },
                                                    children: [
                                                        !isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '50%',
                                                                background: 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '0.875rem',
                                                                fontWeight: '700',
                                                                color: '#fff',
                                                                flexShrink: 0,
                                                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                                            },
                                                            children: msg.userId?.name?.[0]?.toUpperCase() || '?'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                            lineNumber: 263,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: isOwn ? 'flex-end' : 'flex-start',
                                                                flex: 1,
                                                                minWidth: 0
                                                            },
                                                            children: [
                                                                !isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: '0.8125rem',
                                                                        fontWeight: '600',
                                                                        color: '#1877f2',
                                                                        marginBottom: '0.25rem',
                                                                        marginLeft: '0.5rem'
                                                                    },
                                                                    children: msg.userId?.name || 'Unknown User'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        background: isOwn ? 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)' : '#1c1e22',
                                                                        color: '#fff',
                                                                        padding: '0.375rem 0.375rem 0.625rem 0.375rem',
                                                                        borderRadius: isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                                                        fontSize: '0.9375rem',
                                                                        lineHeight: '1.4',
                                                                        position: 'relative',
                                                                        boxShadow: isOwn ? '0 2px 8px rgba(24, 119, 242, 0.4)' : '0 2px 4px rgba(0,0,0,0.3)',
                                                                        border: msg.promotedToEvent ? '2px solid #25d366' : 'none',
                                                                        maxWidth: '100%',
                                                                        minWidth: '120px'
                                                                    },
                                                                    children: [
                                                                        msg.replyTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                background: 'rgba(0,0,0,0.15)',
                                                                                borderRadius: '8px',
                                                                                padding: '0.5rem',
                                                                                marginBottom: '0.375rem',
                                                                                borderLeft: '4px solid',
                                                                                borderLeftColor: isOwn ? '#fff' : '#1877f2',
                                                                                fontSize: '0.8125rem'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        fontWeight: '700',
                                                                                        color: isOwn ? '#fff' : '#1877f2',
                                                                                        marginBottom: '0.125rem'
                                                                                    },
                                                                                    children: msg.replyTo.userId?.name || 'Someone'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                                    lineNumber: 332,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        opacity: 0.8,
                                                                                        overflow: 'hidden',
                                                                                        textOverflow: 'ellipsis',
                                                                                        whiteSpace: 'nowrap'
                                                                                    },
                                                                                    children: msg.replyTo.text
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                                    lineNumber: 339,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                            lineNumber: 323,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                padding: '0 0.5rem',
                                                                                wordBreak: 'break-word'
                                                                            },
                                                                            children: [
                                                                                msg.text,
                                                                                msg.promotedToEvent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        marginLeft: '6px',
                                                                                        fontSize: '0.75rem',
                                                                                        color: '#25d366',
                                                                                        fontWeight: '600'
                                                                                    },
                                                                                    children: "📅 Event"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                                    lineNumber: 353,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                            lineNumber: 350,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: '0.6875rem',
                                                                                color: isOwn ? 'rgba(255,255,255,0.7)' : '#8a8d91',
                                                                                marginTop: '0.25rem',
                                                                                textAlign: 'right',
                                                                                paddingRight: '0.5rem'
                                                                            },
                                                                            children: formatTime(msg.createdAt)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                            lineNumber: 365,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                    lineNumber: 302,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "chat-actions",
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '0.5rem',
                                                                        marginTop: '0.25rem',
                                                                        opacity: 0,
                                                                        transition: 'opacity 0.2s'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>setReplyToMessage(msg),
                                                                            style: {
                                                                                background: '#1c1e22',
                                                                                border: '1px solid #2a2f38',
                                                                                cursor: 'pointer',
                                                                                fontSize: '0.75rem',
                                                                                color: '#8a8d91',
                                                                                fontFamily: 'inherit',
                                                                                padding: '0.25rem 0.625rem',
                                                                                borderRadius: '12px',
                                                                                transition: 'all 0.2s',
                                                                                fontWeight: '500'
                                                                            },
                                                                            onMouseEnter: (e)=>{
                                                                                e.currentTarget.style.background = '#2a2f38';
                                                                                e.currentTarget.style.color = '#1877f2';
                                                                            },
                                                                            onMouseLeave: (e)=>{
                                                                                e.currentTarget.style.background = '#1c1e22';
                                                                                e.currentTarget.style.color = '#8a8d91';
                                                                            },
                                                                            children: "↪ Reply"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                            lineNumber: 385,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>setActiveThread(msg._id),
                                                                            style: {
                                                                                background: '#1c1e22',
                                                                                border: '1px solid #2a2f38',
                                                                                cursor: 'pointer',
                                                                                fontSize: '0.75rem',
                                                                                color: '#8a8d91',
                                                                                fontFamily: 'inherit',
                                                                                padding: '0.25rem 0.625rem',
                                                                                borderRadius: '12px',
                                                                                transition: 'all 0.2s',
                                                                                fontWeight: '500'
                                                                            },
                                                                            onMouseEnter: (e)=>{
                                                                                e.currentTarget.style.background = '#2a2f38';
                                                                                e.currentTarget.style.color = '#1877f2';
                                                                            },
                                                                            onMouseLeave: (e)=>{
                                                                                e.currentTarget.style.background = '#1c1e22';
                                                                                e.currentTarget.style.color = '#8a8d91';
                                                                            },
                                                                            children: [
                                                                                "💬 ",
                                                                                msg.replyCount > 0 ? `${msg.replyCount} ` : '',
                                                                                "Thread"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                            lineNumber: 405,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        !msg.promotedToEvent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>setPromoteTarget(msg),
                                                                            style: {
                                                                                background: '#1c1e22',
                                                                                border: '1px solid #2a2f38',
                                                                                cursor: 'pointer',
                                                                                fontSize: '0.75rem',
                                                                                color: '#8a8d91',
                                                                                fontFamily: 'inherit',
                                                                                padding: '0.25rem 0.625rem',
                                                                                borderRadius: '12px',
                                                                                transition: 'all 0.2s',
                                                                                fontWeight: '500'
                                                                            },
                                                                            onMouseEnter: (e)=>{
                                                                                e.currentTarget.style.background = '#2a2f38';
                                                                                e.currentTarget.style.color = '#25d366';
                                                                            },
                                                                            onMouseLeave: (e)=>{
                                                                                e.currentTarget.style.background = '#1c1e22';
                                                                                e.currentTarget.style.color = '#8a8d91';
                                                                            },
                                                                            children: "📅 Event"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                            lineNumber: 426,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                                    lineNumber: 377,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                            lineNumber: 281,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                    lineNumber: 251,
                                                    columnNumber: 41
                                                }, this)
                                            }, msg._id, false, {
                                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                lineNumber: 249,
                                                columnNumber: 37
                                            }, this);
                                        })
                                    ]
                                }, date, true, {
                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                    lineNumber: 228,
                                    columnNumber: 25
                                }, this)),
                            messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '5rem 1rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: '4rem',
                                            marginBottom: '0.75rem',
                                            opacity: 0.3
                                        },
                                        children: "💬"
                                    }, void 0, false, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 458,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#8a8d91',
                                            margin: 0,
                                            fontSize: '0.9375rem'
                                        },
                                        children: "No messages yet. Start the conversation!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 459,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                lineNumber: 457,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: bottomRef
                            }, void 0, false, {
                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                lineNumber: 463,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                        lineNumber: 220,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: '#1c1e22',
                            padding: '0.875rem 1rem',
                            flexShrink: 0,
                            borderTop: '1px solid #2a2f38',
                            boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
                            display: 'flex',
                            flexDirection: 'column'
                        },
                        children: [
                            replyToMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: '#2a2f38',
                                    borderLeft: '4px solid #1877f2',
                                    borderRadius: '4px 8px 8px 4px',
                                    padding: '0.5rem 0.75rem',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            minWidth: 0,
                                            overflow: 'hidden'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    color: '#1877f2',
                                                    marginBottom: '0.25rem'
                                                },
                                                children: [
                                                    "Replying to ",
                                                    replyToMessage.userId?.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                lineNumber: 488,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '0.8125rem',
                                                    color: '#8a8d91',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden'
                                                },
                                                children: replyToMessage.text
                                            }, void 0, false, {
                                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                                lineNumber: 491,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 487,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setReplyToMessage(null),
                                        style: {
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#8a8d91',
                                            cursor: 'pointer',
                                            padding: '0.25rem'
                                        },
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 495,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                lineNumber: 477,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: sendMessage,
                                style: {
                                    display: 'flex',
                                    gap: '0.625rem',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Type a message...",
                                        value: text,
                                        onChange: (e)=>setText(e.target.value),
                                        style: {
                                            flex: 1,
                                            borderRadius: '24px',
                                            margin: 0,
                                            padding: '0.75rem 1.125rem',
                                            fontSize: '0.9375rem',
                                            background: '#2a2f38',
                                            border: '1px solid #3a3f48',
                                            color: '#e4e6eb',
                                            outline: 'none',
                                            transition: 'all 0.2s'
                                        },
                                        onFocus: (e)=>{
                                            e.target.style.background = '#3a3f48';
                                            e.target.style.borderColor = '#1877f2';
                                        },
                                        onBlur: (e)=>{
                                            e.target.style.background = '#2a2f38';
                                            e.target.style.borderColor = '#3a3f48';
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 505,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: sending || !text.trim(),
                                        style: {
                                            width: '48px',
                                            height: '48px',
                                            padding: 0,
                                            borderRadius: '50%',
                                            background: text.trim() ? 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)' : '#2a2f38',
                                            color: '#fff',
                                            border: 'none',
                                            cursor: text.trim() ? 'pointer' : 'not-allowed',
                                            fontSize: '1.25rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s',
                                            boxShadow: text.trim() ? '0 2px 8px rgba(24, 119, 242, 0.4)' : 'none',
                                            opacity: text.trim() ? 1 : 0.5
                                        },
                                        onMouseEnter: (e)=>{
                                            if (text.trim()) e.currentTarget.style.transform = 'scale(1.05)';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.transform = 'scale(1)';
                                        },
                                        children: sending ? '...' : '➤'
                                    }, void 0, false, {
                                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                        lineNumber: 525,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                lineNumber: 504,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                        lineNumber: 467,
                        columnNumber: 17
                    }, this),
                    promoteTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PromoteEventModal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        message: promoteTarget,
                        groupId: groupId,
                        onClose: ()=>setPromoteTarget(null),
                        onPromoted: (event)=>{
                            setMessages((prev)=>prev.map((m)=>m._id === promoteTarget._id ? {
                                        ...m,
                                        promotedToEvent: event
                                    } : m));
                            setPromoteTarget(null);
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                        lineNumber: 555,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
                .chat-msg-group:hover .chat-actions { opacity: 1 !important; }
            `
                    }, void 0, false, {
                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                        lineNumber: 569,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                lineNumber: 125,
                columnNumber: 13
            }, this),
            " ",
            activeThread && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '320px',
                    borderLeft: '1px solid #2a2f38',
                    background: '#0a0e14',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: '#1c1e22',
                            padding: '0.875rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #2a2f38'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    margin: 0,
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#e4e6eb'
                                },
                                children: "Thread"
                            }, void 0, false, {
                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                lineNumber: 591,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveThread(null),
                                style: {
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#8a8d91',
                                    cursor: 'pointer',
                                    fontSize: '1.25rem'
                                },
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                lineNumber: 592,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                        lineNumber: 583,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreadPanel, {
                            messageId: activeThread,
                            replies: replies[activeThread] || [],
                            onReply: sendReply,
                            currentUserId: user?.userId
                        }, void 0, false, {
                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                            lineNumber: 598,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                        lineNumber: 597,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                lineNumber: 576,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/groups/[id]/chat/page.jsx",
        lineNumber: 123,
        columnNumber: 9
    }, this);
}
_s(ChatPage, "MBZQE5SqKAuLaPOsYvLXFFkYleI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useAuth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ChatPage;
// ── Thread panel ─────────────────────────────────────────────────────
function ThreadPanel({ messageId, replies, onReply, currentUserId }) {
    _s1();
    const [replyText, setReplyText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const threadBottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreadPanel.useEffect": ()=>{
            threadBottomRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ThreadPanel.useEffect"], [
        replies
    ]);
    const handleReply = async (e)=>{
        e.preventDefault();
        if (!replyText.trim()) return;
        setSending(true);
        await onReply(messageId, replyText.trim());
        setReplyText('');
        setSending(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    padding: '1rem',
                    overflowY: 'auto'
                },
                children: [
                    replies.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            paddingTop: '2rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '0.8125rem',
                                color: '#8a8d91',
                                fontStyle: 'italic',
                                margin: 0
                            },
                            children: "No replies yet. Start the thread!"
                        }, void 0, false, {
                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                            lineNumber: 639,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                        lineNumber: 638,
                        columnNumber: 21
                    }, this),
                    replies.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '0.625rem',
                                alignItems: 'flex-start',
                                marginBottom: '1rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        color: '#fff',
                                        flexShrink: 0
                                    },
                                    children: r.userId?.name?.[0]?.toUpperCase() || '?'
                                }, void 0, false, {
                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                    lineNumber: 651,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        minWidth: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '0.8125rem',
                                                fontWeight: '600',
                                                color: '#1877f2',
                                                display: 'block',
                                                marginBottom: '0.25rem'
                                            },
                                            children: r.userId?.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                            lineNumber: 667,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '0.875rem',
                                                color: '#e4e6eb',
                                                wordBreak: 'break-word',
                                                lineHeight: '1.4'
                                            },
                                            children: r.text
                                        }, void 0, false, {
                                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                            lineNumber: 676,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                                    lineNumber: 666,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, r._id, true, {
                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                            lineNumber: 645,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: threadBottomRef
                    }, void 0, false, {
                        fileName: "[project]/app/groups/[id]/chat/page.jsx",
                        lineNumber: 687,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                lineNumber: 636,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '1rem',
                    borderTop: '1px solid #2a2f38',
                    background: '#1c1e22'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleReply,
                    style: {
                        display: 'flex',
                        gap: '0.5rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Reply in thread...",
                            value: replyText,
                            onChange: (e)=>setReplyText(e.target.value),
                            style: {
                                flex: 1,
                                margin: 0,
                                fontSize: '0.875rem',
                                padding: '0.625rem 0.875rem',
                                borderRadius: '20px',
                                background: '#2a2f38',
                                border: '1px solid #3a3f48',
                                color: '#e4e6eb',
                                outline: 'none'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                            lineNumber: 696,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: sending || !replyText.trim(),
                            style: {
                                width: '36px',
                                height: '36px',
                                padding: 0,
                                borderRadius: '50%',
                                fontSize: '1rem',
                                background: replyText.trim() ? 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)' : '#2a2f38',
                                color: '#fff',
                                border: 'none',
                                cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: replyText.trim() ? 1 : 0.5
                            },
                            children: "➤"
                        }, void 0, false, {
                            fileName: "[project]/app/groups/[id]/chat/page.jsx",
                            lineNumber: 713,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/groups/[id]/chat/page.jsx",
                    lineNumber: 695,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/groups/[id]/chat/page.jsx",
                lineNumber: 690,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/groups/[id]/chat/page.jsx",
        lineNumber: 631,
        columnNumber: 9
    }, this);
}
_s1(ThreadPanel, "HvXIv2GjBq0pctcU8j1Qu/6D2hI=");
_c1 = ThreadPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatPage");
__turbopack_context__.k.register(_c1, "ThreadPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_7e826db8._.js.map