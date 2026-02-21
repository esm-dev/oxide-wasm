type SyncInitInput = BufferSource | WebAssembly.Module;
type InitInput = RequestInfo | URL | Response | SyncInitInput;

export function initSync(module: SyncInitInput): void;
export function init(module_or_path: InitInput | Promise<InitInput>): Promise<void>;
export function extract(input: string): string[];
export default init;
