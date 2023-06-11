/**
 * Map of ids from source Canvas course to destination Canvas course
 * @author Yuen Ler Chow
 */
declare type CanvasMigrationIdMap = {
    assignments?: {
        [k: string]: string;
    };
    quizzes?: {
        [k: string]: string;
    };
    announcements?: {
        [k: string]: string;
    };
    discussion_topics?: {
        [k: string]: string;
    };
    files?: {
        [k: string]: string;
    };
    module_items?: {
        [k: string]: string;
    };
    modules?: {
        [k: string]: string;
    };
    pages?: {
        [k: string]: string;
    };
};
export default CanvasMigrationIdMap;
