/* Copyright (c) 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//
//  GTLPlusPerson.h
//

// ----------------------------------------------------------------------------
// NOTE: This file is generated from Google APIs Discovery Service.
// Service:
//   Google+ API (plus/v1)
// Description:
//   The Google+ API enables developers to build on top of the Google+ platform.
// Documentation:
//   https://developers.google.com/+/api/
// Classes:
//   GTLPlusPerson (0 custom class methods, 30 custom properties)
//   GTLPlusPersonAgeRange (0 custom class methods, 2 custom properties)
//   GTLPlusPersonCover (0 custom class methods, 3 custom properties)
//   GTLPlusPersonEmailsItem (0 custom class methods, 2 custom properties)
//   GTLPlusPersonImage (0 custom class methods, 1 custom properties)
//   GTLPlusPersonName (0 custom class methods, 6 custom properties)
//   GTLPlusPersonOrganizationsItem (0 custom class methods, 9 custom properties)
//   GTLPlusPersonPlacesLivedItem (0 custom class methods, 2 custom properties)
//   GTLPlusPersonUrlsItem (0 custom class methods, 3 custom properties)
//   GTLPlusPersonCoverCoverInfo (0 custom class methods, 2 custom properties)
//   GTLPlusPersonCoverCoverPhoto (0 custom class methods, 3 custom properties)

#if GTL_BUILT_AS_FRAMEWORK
  #import "GTL/GTLObject.h"
#else
  #import "GTLObject.h"
#endif

@class GTLPlusPersonAgeRange;
@class GTLPlusPersonCover;
@class GTLPlusPersonCoverCoverInfo;
@class GTLPlusPersonCoverCoverPhoto;
@class GTLPlusPersonEmailsItem;
@class GTLPlusPersonImage;
@class GTLPlusPersonName;
@class GTLPlusPersonOrganizationsItem;
@class GTLPlusPersonPlacesLivedItem;
@class GTLPlusPersonUrlsItem;

// ----------------------------------------------------------------------------
//
//   GTLPlusPerson
//

@interface GTLPlusPerson : GTLObject

// A short biography for this person.
@property (copy) NSString *aboutMe;

// The age range of the person. Valid ranges are 17 or younger, 18 to 20, and 21
// or older. Age is determined from the user's birthday using Western age
// reckoning.
@property (retain) GTLPlusPersonAgeRange *ageRange;

// The person's date of birth, represented as YYYY-MM-DD.
@property (copy) NSString *birthday;

// The "bragging rights" line of this person.
@property (copy) NSString *braggingRights;

// For followers who are visible, the number of people who have added this
// person or page to a circle.
@property (retain) NSNumber *circledByCount;  // intValue

// The cover photo content.
@property (retain) GTLPlusPersonCover *cover;

// The current location for this person.
@property (copy) NSString *currentLocation;

// The name of this person, which is suitable for display.
@property (copy) NSString *displayName;

// The hosted domain name for the user's Google Apps account. For instance,
// example.com. The plus.profile.emails.read or email scope is needed to get
// this domain name.
@property (copy) NSString *domain;

// A list of email addresses that this person has, including their Google
// account email address, and the public verified email addresses on their
// Google+ profile. The plus.profile.emails.read scope is needed to retrieve
// these email addresses, or the email scope can be used to retrieve just the
// Google account email address.
@property (retain) NSArray *emails;  // of GTLPlusPersonEmailsItem

// ETag of this response for caching purposes.
@property (copy) NSString *ETag;

// The person's gender. Possible values include, but are not limited to, the
// following values:
// - "male" - Male gender.
// - "female" - Female gender.
// - "other" - Other.
@property (copy) NSString *gender;

// The ID of this person.
// identifier property maps to 'id' in JSON (to avoid Objective C's 'id').
@property (copy) NSString *identifier;

// The representation of the person's profile photo.
@property (retain) GTLPlusPersonImage *image;

// Whether this user has signed up for Google+.
@property (retain) NSNumber *isPlusUser;  // boolValue

// Identifies this resource as a person. Value: "plus#person".
@property (copy) NSString *kind;

// The user's preferred language for rendering.
@property (copy) NSString *language;

// An object representation of the individual components of a person's name.
@property (retain) GTLPlusPersonName *name;

// The nickname of this person.
@property (copy) NSString *nickname;

// Type of person within Google+. Possible values include, but are not limited
// to, the following values:
// - "person" - represents an actual person.
// - "page" - represents a page.
@property (copy) NSString *objectType;

// The occupation of this person.
@property (copy) NSString *occupation;

// A list of current or past organizations with which this person is associated.
@property (retain) NSArray *organizations;  // of GTLPlusPersonOrganizationsItem

// A list of places where this person has lived.
@property (retain) NSArray *placesLived;  // of GTLPlusPersonPlacesLivedItem

// If a Google+ Page, the number of people who have +1'd this page.
@property (retain) NSNumber *plusOneCount;  // intValue

// The person's relationship status. Possible values include, but are not
// limited to, the following values:
// - "single" - Person is single.
// - "in_a_relationship" - Person is in a relationship.
// - "engaged" - Person is engaged.
// - "married" - Person is married.
// - "its_complicated" - The relationship is complicated.
// - "open_relationship" - Person is in an open relationship.
// - "widowed" - Person is widowed.
// - "in_domestic_partnership" - Person is in a domestic partnership.
// - "in_civil_union" - Person is in a civil union.
@property (copy) NSString *relationshipStatus;

// The person's skills.
@property (copy) NSString *skills;

// The brief description (tagline) of this person.
@property (copy) NSString *tagline;

// The URL of this person's profile.
@property (copy) NSString *url;

// A list of URLs for this person.
@property (retain) NSArray *urls;  // of GTLPlusPersonUrlsItem

// Whether the person or Google+ Page has been verified.
@property (retain) NSNumber *verified;  // boolValue

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonAgeRange
//

@interface GTLPlusPersonAgeRange : GTLObject

// The age range's upper bound, if any. Possible values include, but are not
// limited to, the following:
// - "17" - for age 17
// - "20" - for age 20
@property (retain) NSNumber *max;  // intValue

// The age range's lower bound, if any. Possible values include, but are not
// limited to, the following:
// - "21" - for age 21
// - "18" - for age 18
@property (retain) NSNumber *min;  // intValue

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonCover
//

@interface GTLPlusPersonCover : GTLObject

// Extra information about the cover photo.
@property (retain) GTLPlusPersonCoverCoverInfo *coverInfo;

// The person's primary cover image.
@property (retain) GTLPlusPersonCoverCoverPhoto *coverPhoto;

// The layout of the cover art. Possible values include, but are not limited to,
// the following values:
// - "banner" - One large image banner.
@property (copy) NSString *layout;

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonEmailsItem
//

@interface GTLPlusPersonEmailsItem : GTLObject

// The type of address. Possible values include, but are not limited to, the
// following values:
// - "account" - Google account email address.
// - "home" - Home email address.
// - "work" - Work email address.
// - "other" - Other.
@property (copy) NSString *type;

// The email address.
@property (copy) NSString *value;

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonImage
//

@interface GTLPlusPersonImage : GTLObject

// The URL of the person's profile photo. To resize the image and crop it to a
// square, append the query string ?sz=x, where x is the dimension in pixels of
// each side.
@property (copy) NSString *url;

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonName
//

@interface GTLPlusPersonName : GTLObject

// The family name (last name) of this person.
@property (copy) NSString *familyName;

// The full name of this person, including middle names, suffixes, etc.
@property (copy) NSString *formatted;

// The given name (first name) of this person.
@property (copy) NSString *givenName;

// The honorific prefixes (such as "Dr." or "Mrs.") for this person.
@property (copy) NSString *honorificPrefix;

// The honorific suffixes (such as "Jr.") for this person.
@property (copy) NSString *honorificSuffix;

// The middle name of this person.
@property (copy) NSString *middleName;

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonOrganizationsItem
//

@interface GTLPlusPersonOrganizationsItem : GTLObject

// The department within the organization. Deprecated.
@property (copy) NSString *department;

// A short description of the person's role in this organization. Deprecated.
// Remapped to 'descriptionProperty' to avoid NSObject's 'description'.
@property (copy) NSString *descriptionProperty;

// The date that the person left this organization.
@property (copy) NSString *endDate;

// The location of this organization. Deprecated.
@property (copy) NSString *location;

// The name of the organization.
@property (copy) NSString *name;

// If "true", indicates this organization is the person's primary one, which is
// typically interpreted as the current one.
@property (retain) NSNumber *primary;  // boolValue

// The date that the person joined this organization.
@property (copy) NSString *startDate;

// The person's job title or role within the organization.
@property (copy) NSString *title;

// The type of organization. Possible values include, but are not limited to,
// the following values:
// - "work" - Work.
// - "school" - School.
@property (copy) NSString *type;

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonPlacesLivedItem
//

@interface GTLPlusPersonPlacesLivedItem : GTLObject

// If "true", this place of residence is this person's primary residence.
@property (retain) NSNumber *primary;  // boolValue

// A place where this person has lived. For example: "Seattle, WA", "Near
// Toronto".
@property (copy) NSString *value;

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonUrlsItem
//

@interface GTLPlusPersonUrlsItem : GTLObject

// The label of the URL.
@property (copy) NSString *label;

// The type of URL. Possible values include, but are not limited to, the
// following values:
// - "otherProfile" - URL for another profile.
// - "contributor" - URL to a site for which this person is a contributor.
// - "website" - URL for this Google+ Page's primary website.
// - "other" - Other URL.
@property (copy) NSString *type;

// The URL value.
@property (copy) NSString *value;

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonCoverCoverInfo
//

@interface GTLPlusPersonCoverCoverInfo : GTLObject

// The difference between the left position of the cover image and the actual
// displayed cover image. Only valid for banner layout.
@property (retain) NSNumber *leftImageOffset;  // intValue

// The difference between the top position of the cover image and the actual
// displayed cover image. Only valid for banner layout.
@property (retain) NSNumber *topImageOffset;  // intValue

@end


// ----------------------------------------------------------------------------
//
//   GTLPlusPersonCoverCoverPhoto
//

@interface GTLPlusPersonCoverCoverPhoto : GTLObject

// The height of the image.
@property (retain) NSNumber *height;  // intValue

// The URL of the image.
@property (copy) NSString *url;

// The width of the image.
@property (retain) NSNumber *width;  // intValue

@end
