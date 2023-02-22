"use strict";
/**
 * Functions for interacting with discussion topics within courses
 * @namespace api.course.discussionTopic
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared classes
var EndpointCategory_1 = __importDefault(require("../../shared/EndpointCategory"));
// Import shared helpers
var utils_1 = __importDefault(require("../../shared/helpers/utils"));
// Import shared constants
var API_PREFIX_1 = __importDefault(require("../../shared/constants/API_PREFIX"));
// Endpoint category
var ECatDiscussionTopic = /** @class */ (function (_super) {
    __extends(ECatDiscussionTopic, _super);
    function ECatDiscussionTopic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*------------------------------------------------------------------------*/
    /*                                Endpoints                               */
    /*------------------------------------------------------------------------*/
    /**
     * Gets the list of discussion topics
     * @author Gabe Abrams
     * @method list
     * @memberof api.course.discussionTopic
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId] Canvas course Id to query
     * @param {boolean} [opts.includeAllDates] If truthy, includes
     *   all dates
     * @param {boolean} [opts.includeSections] If truthy, includes
     *   sections
     * @param {boolean} [opts.includeSectionsUserCount] If truthy,
     *   includes section user count
     * @param {boolean} [opts.includeOverrides] If truthy,
     *   includes overrides
     * @param {string} [opts.searchTerm] If included, the partial title of the
     *   discussion topics to match and return
     * @param {string} [opts.orderBy="position"] If included, the results are
     *   ordered as instructed. Can be "position" or "recent_activity" or "title"
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic[]>} List of Canvas Discussion Topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    ECatDiscussionTopic.prototype.list = function (opts, config) {
        var _a;
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'get the list of discussion topics in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/discussion_topics"),
                        method: 'GET',
                        params: {
                            include: utils_1.default.genIncludesList({
                                all_dates: opts.includeAllDates,
                                sections: opts.includeSections,
                                sections_user_count: opts.includeSectionsUserCount,
                                overrides: opts.includeOverrides,
                            }),
                            search_term: utils_1.default.includeIfTruthy(opts.searchTerm),
                            order_by: utils_1.default.includeIfTruthy(opts.orderBy),
                        },
                    })];
            });
        });
    };
    /**
     * Creates a new discussion topic
     * @author Gabe Abrams
     * @method create
     * @memberof api.course.discussionTopic
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.title title of the discussion
     * @param {string} opts.message message of the discussion
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.discussionType="side_comment"] the type of
     *   discussion. Accepted values are 'side_comment', for discussions that
     *   only allow one level of nested comments, and 'threaded' for fully
     *   threaded discussions.
     * @param {boolean} [opts.published] if true, topic is published. If false,
     *   discussion topic is left in draft state
     * @param {date} [opts.delayedPostAt] if a date is given, the topic will
     *   not be published until that time
     * @param {boolean} [opts.allowRating] if true, users can rate entries in
     *   this topic
     * @param {date} [opts.lockAt] if a date is given, the topic will be
     *   scheduled to lock at the provided timestamp. If the date is in the past,
     *   the topic will be locked
     * @param {boolean} [opts.pinned] if true, this topic will be listed in
     *   the “Pinned Discussion” section
     * @param {number} [opts.groupSetId] if included, the topic will become a
     *   group discussion assigned to the group
     * @param {boolean} [opts.onlyGradersCanRate] if true, only graders will
     *   be allowed to rate entries.
     * @param {boolean} [opts.requireInitialPost] if true, then a user may not
     *   respond to other replies until that user has made an initial reply
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic>} A Canvas Discussion Topics {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    ECatDiscussionTopic.prototype.create = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'create a discussion topic in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/discussion_topics"),
                        method: 'POST',
                        params: {
                            title: opts.title,
                            message: opts.message,
                            discussion_type: utils_1.default.includeIfTruthy(opts.discussionType),
                            published: utils_1.default.includeIfBoolean(opts.published),
                            delayed_post_at: utils_1.default.includeIfDate(opts.delayedPostAt),
                            lock_at: utils_1.default.includeIfDate(opts.lockAt),
                            require_initial_post: (utils_1.default.includeIfBoolean(opts.requireInitialPost)),
                            pinned: utils_1.default.includeIfBoolean(opts.pinned),
                            group_category_id: utils_1.default.includeIfNumber(opts.groupSetId),
                            allow_rating: utils_1.default.includeIfBoolean(opts.allowRating),
                            only_graders_can_rate: (utils_1.default.includeIfBoolean(opts.onlyGradersCanRate)),
                        },
                    })];
            });
        });
    };
    /**
     * Deletes a discussion topic
     * @author Gabe Abrams
     * @method delete
     * @memberof api.course.discussionTopic
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.topicId the id of the Canvas discussion topic to
     *   delete
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic>} A Canvas Discussion Topic {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    ECatDiscussionTopic.prototype.delete = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'delete a discussion topic from a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/discussion_topics/").concat(opts.topicId),
                        method: 'DELETE',
                    })];
            });
        });
    };
    /**
     * Update whether a discussion topic is published or not
     * @author Gabe Abrams
     * @method updatePublishState
     * @memberof api.course.discussionTopic
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.topicId the id of the Canvas discussion topic to
     *   update
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   modify
     * @param {boolean} [opts.isPublished] if true, publish the discussion topic.
     *   Otherwise, unpublish it
     */
    ECatDiscussionTopic.prototype.updatePublishState = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'update the published state of a specific discussion topic',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/discussion_topics/").concat(opts.topicId),
                        method: 'PUT',
                        params: {
                            published: !!opts.isPublished,
                        },
                    })];
            });
        });
    };
    /**
     * Lists the entries in a discussion topic
     * @author Gabe Abrams
     * @method listEntries
     * @memberof api.course.discussionTopic
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {string} opts.topicId the id of the Canvas discussion topic to
     *   list entries in
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasDiscussionTopic>} A Canvas Discussion Topic {@link https://canvas.instructure.com/doc/api/discussion_topics.html#DiscussionTopic}
     */
    ECatDiscussionTopic.prototype.listEntries = function (opts, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.visitEndpoint({
                        config: config,
                        action: 'list entries in a discussion topic in a course',
                        path: "".concat(API_PREFIX_1.default, "/courses/").concat((_a = opts.courseId) !== null && _a !== void 0 ? _a : this.defaultCourseId, "/discussion_topics/").concat(opts.topicId, "/entries"),
                        method: 'GET',
                    })];
            });
        });
    };
    return ECatDiscussionTopic;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatDiscussionTopic;
//# sourceMappingURL=ECatDiscussionTopic.js.map